const dropDownCurso = document.getElementById('select-curso')
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const sessionId = sessionStorage.getItem("id");
const localId = localStorage.getItem("id");

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

const aluno_id = userId || sessionId || localId;

console.log('ID do usuário sendo editado:', aluno_id);
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

const APIUsuario = `http://localhost:3000/usuario/${aluno_id}`

const inputNome = document.getElementById("nome")
const inputCPF = document.getElementById("CPF")
const inputMatricula = document.getElementById("matricula")
const inputTelefone = document.getElementById("telefone")
const inputEmail = document.getElementById("email")
const selectCurso = document.getElementById("select-curso")
const selectTurma = document.getElementById("select-turma")
const selectPagamento = document.getElementById("select-pagamento")

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

    inputNome.value = usuarios.nome;
    inputCPF.value = usuarios.CPF;
    inputMatricula.value = usuarios.matricula;
    inputTelefone.value = usuarios.telefone;
    inputEmail.value = usuarios.email;

    selectCurso.innerHTML = `<option value="${cursos.id}" selected>${cursos.nome}</option>`;
    selectTurma.innerHTML = `<option value="${turmas.id}" selected>${turmas.turma}</option>`;
    selectPagamento.value = usuarios.pagamento;
}
carregarUsuario()

const formCadastrar = document.getElementById("formsCadastro")

formCadastrar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
        nome: inputNome.value,
        CPF: inputCPF.value,
        matricula: inputMatricula.value,
        telefone: inputTelefone.value,
        email: inputEmail.value,
        curso_id: selectCurso.value,
        turma_id: selectTurma.value,
        pagamento: selectPagamento.value,
    };

    console.log('Dados que serão enviados:', dadosAtualizados);

    try {
        const response = await fetch(APIUsuario, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            const resultado = await response.json();
            console.log('Usuário atualizado com sucesso!', resultado);
            Swal.fire({
                title: "Usuário atualizado!",
                icon: "success",
                draggable: true,
                timer: 1500,          
                showConfirmButton: false 
            }).then(() => {
                window.location.href = "../4.Armarios/index.html";
            });
        } else {
            console.error('Erro na requisição:', response.status);
            Toast.fire('Erro ao atualizar usuário. Código: ' + response.status);
        }

    } catch (error) {
        console.error('Erro no fetch:', error);
        Toast.fire('Erro de conexão com o servidor.');
    }
});