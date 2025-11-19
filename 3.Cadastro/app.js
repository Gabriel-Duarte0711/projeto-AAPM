const APICurso = "http://localhost:3000/curso"
const APIArmario = "http://localhost:3000/armarios"
const dropDownCurso = document.getElementById('select-curso')

async function buscarCursosDoBanco() {
    try {
        const response = await fetch(APICurso);
        if (!response.ok) {
            throw new Error('Erro na requisição à API');
        }

        const dados = await response.json();
        console.log('Dados recebidos:', dados);
        return dados; // retorna os dados para serem usados depois

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

// pega os curso do banco e coloca no dropDown
async function carregarCursos() {
    const dadosCursos = await buscarCursosDoBanco();

    dadosCursos.forEach(cursos => {
        const createOption = document.createElement('option')
        createOption.value = cursos.id;
        createOption.textContent = cursos.nome;
        dropDownCurso.appendChild(createOption)
    });
}
carregarCursos();
const dropDownTurma = document.getElementById('select-turma')
// carrega as turmas dps que o curso for selecionado
dropDownCurso.addEventListener('change', () => {
    const curso_id = dropDownCurso.value;
    const APITurma = `http://localhost:3000/turma/${curso_id}`;


    async function buscarTurmasDoBanco() {
        try {
            const response = await fetch(APITurma);
            if (!response.ok) {
                throw new Error('Erro na requisição à API');
            }

            const dados = await response.json();
            console.log('Dados recebidos:', dados);
            return dados; // retorna os dados para serem usados depois

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return null;
        }
    }
    async function carregarTurmas() {
        const dadosTurmas = await buscarTurmasDoBanco();
        dropDownTurma.innerHTML = ""
        const optionDefault = document.createElement('option');
        optionDefault.textContent = "Selecione uma turma";
        optionDefault.value = "";
        optionDefault.disabled = true;
        optionDefault.selected = true;
        dropDownTurma.appendChild(optionDefault);
        dadosTurmas.forEach(turmas => {
            const createOption = document.createElement('option')
            createOption.value = turmas.id;
            createOption.textContent = turmas.turma;
            dropDownTurma.appendChild(createOption)
        });
    }
    carregarTurmas();
})


// cadastro de um aluno
const APIUsuario = "http://localhost:3000/usuario"

const inputNome = document.getElementById("nome")
const inputMatricula = document.getElementById("matricula")
const inputTelefone = document.getElementById("telefone")
const inputEmail = document.getElementById("email")
const formCadastrar = document.getElementById("formsCadastro")

async function cadastrar(e) {
    e.preventDefault();

    async function buscarUsuarioDoBanco() {
        try {
            const response = await fetch(APIUsuario);
            if (!response.ok) {
                throw new Error('Erro na requisição à API');
            }

            const dados = await response.json();
            console.log('Dados recebidos:', dados);
            return dados; // retorna os dados para serem usados depois

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return null;
        }
    }
    const nome = inputNome.value.trim();
    const matricula = inputMatricula.value.trim();
    const telefone = inputTelefone.value.trim().replace(/\D/g, '');
    const email = inputEmail.value.trim();
    const curso_id = dropDownCurso.value;
    const turma_id = dropDownTurma.value;

    const usuarios = await buscarUsuarioDoBanco();

    if (!usuarios) {
        alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        return;
    }

    if (!nome || !matricula || !telefone || !email || !curso_id || !turma_id) {
        alert("Por gentileza, preencha os campos obrigatórios (nome, matricula, telefone, email, curso e turma).");
        return;
    }

    const matriculaJaExiste = usuarios.some(u => validator.equals(u.matricula, matricula));
    if (matriculaJaExiste) {
        alert("Matrícula já cadastrada");
        return;
    }
    if (!validator.isMobilePhone('+55' + telefone, 'pt-BR')) {
        alert("telefone invalido")
        return;
    }
    if (!validator.isEmail(email)) {
        alert("email invalido")
        return;
    }


    const armario_id = window.localStorage.getItem('armarioSelecionado');

    const novaReserva = { nome, matricula, telefone, email, curso_id, turma_id, armario_id }

    try {
        const requisicao = await fetch(APIUsuario, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaReserva)
        });
        const APIArmarioComNumero = `${APIArmario}/${armario_id}`;
        const requisicaoArmario = await fetch(APIArmarioComNumero, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: "O" })
        });


        if (requisicao.ok) {
            const dados = await requisicao.json();
            if (!requisicaoArmario.ok) {
                alert("Erro ao atualizar o armário!");
                return;
            }
            console.log("reserva salva com sucesso:", dados);
            alert("reserva feita com sucesso!");
            window.location.href = "../4.Armarios/index.html";
            formCadastrar.reset();
        } else {
            console.error("Erro na requisição:", requisicao.status);
            alert("Erro ao fazer reserva. Código: " + requisicao.status);
        }


    } catch (error) {
        console.error("Erro no fetch:", error);
        alert("Erro de conexão com o servidor.");
    }
}
formCadastrar.addEventListener("submit", cadastrar);


