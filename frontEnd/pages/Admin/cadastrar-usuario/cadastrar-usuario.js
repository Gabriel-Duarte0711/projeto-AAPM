import { validarCPF } from "../../../utils/validarCPF.js";
const APICurso = "http://localhost:3000/curso";

const dropDownCurso = document.getElementById("select-curso");

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});


async function buscarCursosDoBanco() {
  try {
    const response = await fetch(APICurso);
    if (!response.ok) {
      throw new Error("Erro na requisição à API");
    }

    const dados = await response.json();
    console.log("Dados recebidos:", dados);
    return dados; // retorna os dados para serem usados depois
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}

// pega os curso do banco e coloca no dropDown
async function carregarCursos() {
  const dadosCursos = await buscarCursosDoBanco();

  dadosCursos.forEach((cursos) => {
    const createOption = document.createElement("option");
    createOption.value = cursos.id;
    createOption.textContent = cursos.nome;
    dropDownCurso.appendChild(createOption);
  });
}
carregarCursos();
const dropDownTurma = document.getElementById("select-turma");
// carrega as turmas dps que o curso for selecionado
dropDownCurso.addEventListener("change", () => {
  const curso_id = dropDownCurso.value;
  console.log(curso_id);
  const APITurma = `http://localhost:3000/turma/curso/${curso_id}`;

  async function buscarTurmasDoBanco() {
    try {
      const response = await fetch(APITurma);
      if (!response.ok) {
        throw new Error("Erro na requisição à API");
      }

      const dados = await response.json();
      console.log("Dados recebidos:", dados);
      return dados; // retorna os dados para serem usados depois
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return null;
    }
  }
  async function carregarTurmas() {
    const dadosTurmas = await buscarTurmasDoBanco();
    dropDownTurma.innerHTML = "";
    const optionDefault = document.createElement("option");
    optionDefault.textContent = "Selecione a turma*";
    optionDefault.value = "default";
    optionDefault.disabled = true;
    optionDefault.selected = true;
    dropDownTurma.appendChild(optionDefault);
    dadosTurmas.forEach((turmas) => {
      const createOption = document.createElement("option");
      createOption.value = turmas.id;
      createOption.textContent = turmas.turma;
      dropDownTurma.appendChild(createOption);
    });
  }
  carregarTurmas();
});

// cadastro de um aluno
const APIUsuario = "http://localhost:3000/alunos";
const APIalunoCPF = "http://localhost:3000/alunos/cpf";

const inputNome = document.getElementById("nome");
const inputCPF = document.getElementById("CPF");

const inputMatricula = document.getElementById("matricula");
const inputTelefone = document.getElementById("telefone");
const inputEmail = document.getElementById("email");
const formCadastrar = document.getElementById("formsCadastro");
const inputPagamento = document.getElementById("select-pagamento");



inputCPF.addEventListener("input", () => {
    let valor = inputCPF.value.replace(/\D/g, "");
    if (valor.length < 11) {
        resetFormulario();
    }
    aplicarMascaraCPF();
});

inputCPF.addEventListener("blur", buscarAlunoPorCPFEvent);

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

async function buscarAlunoPorCPFEvent() {
  const cpfLimpo = inputCPF.value.replace(/\D/g, "");
  if (cpfLimpo.length !== 11) return;

  if (!validarCPF(cpfLimpo)) {
    Toast.fire({ icon: "error", title: "CPF inválido!" });
    return;
  }

  try {
    const dadosCPF = await buscarAlunoPorCPF(cpfLimpo); // usa a função reutilizável
    if (dadosCPF) preencherFormulario(dadosCPF);
    else resetFormulario();
  } catch (err) {
    console.error(err);
    Toast.fire("Erro ao buscar aluno pelo CPF.");
  }
}
async function buscarAlunoPorCPF(cpf) {
  const cpfLimpo = String(cpf).replace(/\D/g, "");
  if (cpfLimpo.length !== 11) return null;

  try {
    const resposta = await fetch(APIalunoCPF, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CPF: cpfLimpo })
    });
    if (!resposta.ok) return null;
    const dados = await resposta.json();
    return dados || null;
  } catch (err) {
    console.error("Erro buscarAlunoPorCPF:", err);
    return null;
  }
}
// Funções auxiliares
function preencherFormulario(dadosCPF) {
  document.getElementById("nome").value = dadosCPF.nome;
  document.getElementById("matricula").value = dadosCPF.matricula;
  document.getElementById("telefone").value = dadosCPF.telefone;
  document.getElementById("email").value = dadosCPF.email;
  document.getElementById("select-pagamento").value = dadosCPF.pagamento;
  document.getElementById("select-curso").value = dadosCPF.curso_id;
  document.getElementById("select-curso").dispatchEvent(new Event("change"));
  setTimeout(() => {
    document.getElementById("select-turma").value = dadosCPF.turma_id;
  }, 100);
}

function resetFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("matricula").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("select-pagamento").value = "default";
  document.getElementById("select-curso").value = "default";
  document.getElementById("select-curso").dispatchEvent(new Event("change"));
  setTimeout(() => {
    document.getElementById("select-turma").value = "default";
  }, 100);
}
async function cadastrar(e) {
  e.preventDefault();

  async function buscarUsuarioDoBanco() {
    try {
      const response = await fetch(APIUsuario);
      if (!response.ok) {
        throw new Error("Erro na requisição à API");
      }

      const dados = await response.json();
      console.log("Dados recebidos:", dados);
      return dados; // retorna os dados para serem usados depois
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return null;
    }
  }
  const nome = inputNome.value.trim();
  const cpf = inputCPF.value.trim();
  const matricula = inputMatricula.value.trim();
  const telefone = inputTelefone.value.trim().replace(/\D/g, "");
  const email = inputEmail.value.trim();
  const curso_id = dropDownCurso.value;
  const turma_id = dropDownTurma.value;
  const pagamento = inputPagamento.value.trim();

  const usuarios = await buscarUsuarioDoBanco();

  if (!usuarios) {
    Toast.fire("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    return;
  }

  if (
    !nome ||
    !cpf ||
    !matricula ||
    !telefone ||
    !email ||
    !curso_id ||
    !turma_id ||
    !pagamento
  ) {
    Toast.fire(
      "Por gentileza, preencha os campos obrigatórios (nome, cpf, matricula, telefone, email, curso, turma e pagamento)."
    );
    return;
  }

  if (!validator.isMobilePhone("+55" + telefone, "pt-BR")) {
    Toast.fire("Telefone invalido");
    return;
  }
  if (!validator.isEmail(email)) {
    Toast.fire("Email invalido");
    return;
  }

  const armario_id = window.localStorage.getItem("armarioSelecionado");
  const armarioEstado = window.localStorage.getItem("armarioEstado");

  const novaReserva = {
    nome,
    CPF: cpf,
    matricula,
    telefone,
    email,
    curso_id: Number(curso_id),
    turma_id: Number(turma_id),
    pagamento,
    armario_id: Number(armario_id),
    data_encerramento: null,
  };
  const recadastroReserva = {
    armario_id: Number(armario_id),
  };
  const dadosCPF = await buscarAlunoPorCPF(cpf.replace(/\D/g, ''));

  if (dadosCPF) {
    //put recadastro
    const userId = dadosCPF.id_usuario;
    const APIrecadastro = `http://localhost:3000/alunos/recadastrar/${userId}`;
    try {
      const requisicao = await fetch(APIrecadastro, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recadastroReserva),
      });
      const armarioAtualizado = { estado: "O" };
      const requisicaoArmario = await fetch(
        `http://localhost:3000/armarios/${armario_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(armarioAtualizado),
        }
      );

      if (requisicao.ok) {
        const dados = await requisicao.json();
        const dadosArmario = await requisicaoArmario.json();
        console.log("reserva salva com sucesso:", dados);
        Swal.fire({
          title: "Reserva Concluída!",
          text: "A reserva foi concluída com sucesso.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "../armarios/armarios.html";
          formCadastrar.reset();
        });
      } else {
        console.error("Erro na requisição:", requisicao.status);
        Toast.fire("Erro ao fazer reserva. Código: " + requisicao.status);
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      Toast.fire("Erro de conexão com o servidor.");
    }
  } else {
    const matriculaJaExiste = usuarios.some((u) =>
      validator.equals(u.matricula, matricula)
    );
    if (matriculaJaExiste) {
      Toast.fire("Matrícula já cadastrada");
      return;
    }
    try {
      const requisicao = await fetch(APIUsuario, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaReserva),
      });
      const armarioAtualizado = { estado: "O" };
      const requisicaoArmario = await fetch(
        `http://localhost:3000/armarios/${armario_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(armarioAtualizado),
        }
      );

      if (requisicao.ok) {
        const dados = await requisicao.json();
        const dadosArmario = await requisicaoArmario.json();
        console.log("reserva salva com sucesso:", dados);
        Swal.fire({
          title: "Reserva Concluída!",
          text: "A reserva foi concluída com sucesso.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "../armarios/armarios.html";
          formCadastrar.reset();
        });
      } else {
        console.error("Erro na requisição:", requisicao.status);
        Toast.fire("Erro ao fazer reserva. Código: " + requisicao.status);
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      Toast.fire("Erro de conexão com o servidor.");
    }
  }
}
formCadastrar.addEventListener("submit", cadastrar);
