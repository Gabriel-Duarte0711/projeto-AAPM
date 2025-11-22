
const dropDownCurso = document.getElementById('select-curso')
const sessionId = sessionStorage.getItem("id");
const localId = localStorage.getItem("id");
const aluno_id = sessionId || localId;
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

// cadastro de um aluno
const APIUsuario = `http://localhost:3000/usuario/${aluno_id}`

const inputNome = document.getElementById("nome")
const inputMatricula = document.getElementById("matricula")
const inputTelefone = document.getElementById("telefone")
const inputEmail = document.getElementById("email")
const inputCurso = document.getElementById("curso")
const inputTurma = document.getElementById("turma")
const formCadastrar = document.getElementById("formsCadastro")

async function carregarUsuario() {
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
    const usuarios = await buscarUsuarioDoBanco();

    const APICurso = `http://localhost:3000/curso/${usuarios.curso_id}`
    const APITurma = `http://localhost:3000/turma/${usuarios.turma_id}`
    async function buscarCursoDoBanco() {
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
    const cursos = await buscarCursoDoBanco();
    const turmas = await buscarTurmasDoBanco();
    console.log(usuarios.turma_id)
    console.log(turmas)
    inputNome.value = usuarios.nome;
    inputMatricula.value = usuarios.matricula;
    inputTelefone.value = usuarios.telefone;
    inputEmail.value = usuarios.email;
    inputCurso.value =  cursos.nome;
    inputTurma.value = turmas.turma;
}
carregarUsuario()
