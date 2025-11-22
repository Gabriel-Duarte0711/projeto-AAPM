const APILogin = "http://localhost:3000/login"
const APIUsuario = "http://localhost:3000/usuario"
const inputEmail = document.getElementById("email")
const inputSenha = document.getElementById("senha")
const btnEntrar = document.getElementById("btnEntrar")
const checkboxLembrar = document.getElementById("remember")

const Toast = Swal.mixin({
  toast: true,          
  position: 'top-end',   
  showConfirmButton: false,
  timer: 2000,           
  timerProgressBar: true,
});


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
        Toast.fire("Erro ao conectar ao servidor. Tente novamente mais tarde.");
        return;
    }
    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    const emailExiste = usuario.find(user => user.email === email)

    if (!emailExiste) {
        Toast.fire("Email nao cadastrado")
        return;
    }

    const aluno_id = emailExiste.id;
    const pegarAluno = loginUsuario.find(logar => logar.aluno_id === aluno_id)
    console.log("Checkbox está marcado?", checkboxLembrar.checked);
    if (pegarAluno.senha === senha) {
        localStorage.removeItem("id");
        sessionStorage.removeItem("id");

        if (checkboxLembrar.checked) {
            localStorage.setItem("id", aluno_id);
        } else {
            sessionStorage.setItem("id", aluno_id);
            localStorage.removeItem("id");
        }

        if (pegarAluno.perfil === "aluno") {
            window.location.href = "../5.Usuario/index.html";
        } else if (pegarAluno.perfil === "admin") {
            window.location.href = "../2.Dashboard/index.html";
        }

    } else {
        Toast.fire("Senha incorreta");
    }
})
