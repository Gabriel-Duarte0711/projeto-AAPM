const APILogin = "http://localhost:3000/login"
const inputEmail = document.getElementById("email")
const inputSenha = document.getElementById("password")
const btnEntrar = document.getElementById("btnEntrar")
const checkboxLembrar = document.getElementById("remember")

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

btnEntrar.addEventListener('click', async (event) => {
    event.preventDefault();


    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    if (!email || !senha) {
        Toast.fire("Preencha todos os campos!");
        return;
    }
    try {
        const lembrar = checkboxLembrar.checked
        const response = await fetch(APILogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha, lembrar })
        })

        const dado = await response.json();
        if (!response.ok) {
            Toast.fire(dado.erro || "Erro ao fazer login");
            return;
        }

        if (checkboxLembrar.checked) {
            localStorage.setItem("id", dado.usuario.id);
            localStorage.setItem("token", dado.token); 
        } else {
            sessionStorage.setItem("id", dado.usuario.id);
            sessionStorage.setItem("token", dado.token);
        }
        console.log(dado)
        const perfil = dado.usuario.perfil;
        
        if (perfil === "aluno") {
            window.location.href = "/frontend/pages/Usuário/tela-principal/tela-principal.html";
        } else {
            window.location.href = "/frontend/pages/Admin/dashboard/dashboard.html";
        }

    } catch (error) {
        console.log("Erro:", error);
        Toast.fire("Erro de conexão com o servidor.");
    }

})

const password = document.getElementById('password')
const icon = document.getElementById('icon')

function mostrarSenha() {
    if (password.type === 'password') {
        password.setAttribute('type', 'text')
        icon.classList.add('hide')
    }
    else {
        password.setAttribute('type', 'password')
        icon.classList.remove('hide')
    }
}