import { validarCPF } from "../../../utils/validarCPF.js";
const dropDownCurso = document.getElementById("select-curso");
const dropDownTurma = document.getElementById("select-turma");

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
const sessionId = sessionStorage.getItem("id");
const localId = localStorage.getItem("id");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

const aluno_id = userId || sessionId || localId;

console.log("ID do usuário sendo editado:", aluno_id);

const APIUsuario = `http://localhost:3000/alunos/${aluno_id}`;

const inputNome = document.getElementById("nome");
const inputCPF = document.getElementById("CPF");
const inputMatricula = document.getElementById("matricula");
const inputTelefone = document.getElementById("telefone");
const inputEmail = document.getElementById("email");
const selectPagamento = document.getElementById("select-pagamento");

inputCPF.addEventListener("input", aplicarMascaraCPF);

function aplicarMascaraCPF() {
  let valor = inputCPF.value.replace(/\D/g, ""); // remove tudo que não é número
  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length <= 3) inputCPF.value = valor;
  else if (valor.length <= 6)
    inputCPF.value = valor.replace(/(\d{3})(\d+)/, "$1.$2");
  else if (valor.length <= 9)
    inputCPF.value = valor.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  else
    inputCPF.value = valor.replace(
      /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
      "$1.$2.$3-$4"
    );
}

async function carregarCursos(usuarios) {
  try {
    const response = await fetch("http://localhost:3000/curso");
    const cursos = await response.json();

    dropDownCurso.innerHTML = "";

    cursos.forEach((curso) => {
      const option = document.createElement("option");
      option.value = curso.id;
      option.textContent = curso.nome;

      if (curso.id === usuarios.curso_id) {
        option.selected = true;
      }

      dropDownCurso.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
  }
}

async function carregarTurmas(usuarios) {
  const curso_id = dropDownCurso.value;

  try {
    const response = await fetch(
      `http://localhost:3000/turma/curso/${curso_id}`
    );
    const turmas = await response.json();

    dropDownTurma.innerHTML = "";

    turmas.forEach((turma) => {
      const option = document.createElement("option");
      option.value = turma.id;
      option.textContent = turma.turma;

      if (turma.id === usuarios.turma_id) {
        option.selected = true;
      }

      dropDownTurma.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar turmas:", error);
  }
}

dropDownCurso.addEventListener("change", () => {
  carregarTurmas({ turma_id: null }); // limpa seleção
});

async function carregarUsuario() {
  try {
    const response = await fetch(APIUsuario);
    const usuarios = await response.json();

    console.log("Dados do usuário:", usuarios);

    inputNome.value = usuarios.nome;
    inputCPF.value = usuarios.CPF;
    inputMatricula.value = usuarios.matricula;
    inputTelefone.value = usuarios.telefone;
    inputEmail.value = usuarios.email;
    selectPagamento.value = usuarios.pagamento;

    // carregar listas completas e marcar selecionados
    await carregarCursos(usuarios);
    await carregarTurmas(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
  }
}

carregarUsuario();

const formCadastrar = document.getElementById("formsCadastro");

formCadastrar.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validarCPF(inputCPF.value)) {
    Toast.fire("CPF inválido!");
    return;
  }
  const dadosAtualizados = {
    CPF: inputCPF.value.replace(/\D/g, ""),
    nome: inputNome.value,
    matricula: inputMatricula.value,
    telefone: inputTelefone.value,
    email: inputEmail.value,
    curso_id: Number(dropDownCurso.value),
    turma_id: Number(dropDownTurma.value),
    pagamento: selectPagamento.value,
  };

  console.log("Enviando dados:", dadosAtualizados);

  try {
    const response = await fetch(APIUsuario, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (response.ok) {
      Swal.fire({
        title: "Usuário atualizado!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "../armarios/armarios.html";
      });
    } else {
      Toast.fire("Erro ao atualizar usuário. Código: " + response.status);
    }
  } catch (error) {
    console.error("Erro no fetch:", error);
    Toast.fire("Erro de conexão com o servidor.");
  }
});