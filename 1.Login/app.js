const APILogin = "http://localhost:3000/login"
const APIUsuario = "http://localhost:3000/usuario"
const inputEmail = document.getElementById("email")
const inputSenha = document.getElementById("senha")
const btnEntrar = document.getElementById("btnEntrar")

async function buscarLoginDoBanco() {
    try {
        const response = await fetch(APILogin);
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
btnEntrar.addEventListener('click', async () => {
    event.preventDefault();
    const loginUsuario = await buscarLoginDoBanco();
    const usuario = await buscarUsuarioDoBanco();
    if (!loginUsuario || !usuario) {
        alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        return;
    }
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    const emailExiste = usuario.find(user => user.email === email)

    if (!emailExiste) {
        alert("email nao cadastrado")
        return;
    }

    const aluno_id = emailExiste.id;
    const pegarAluno = loginUsuario.find(logar => logar.aluno_id === aluno_id)

    if (pegarAluno.senha === senha) {
        if (pegarAluno.perfil === "aluno") {
            localStorage.setItem("id", aluno_id)
            window.location.href = "../indexU.html";
        } else if(pegarAluno.perfil === "admin"){
            localStorage.setItem("id", aluno_id)
            window.location.href = "../indexA.html";
        }

    } else {
        alert("Senha incorreta");
    }
})
