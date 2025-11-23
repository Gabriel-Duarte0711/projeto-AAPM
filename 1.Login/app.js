const APILogin = "http://localhost:3000/login"
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



btnEntrar.addEventListener('click', async () => {
    event.preventDefault();


    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    if (!email || !senha) {
        Toast.fire("Preencha todos os campos!");
        return;
    }
    try {
        const response = await fetch(APILogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        })

        const dado = await response.json();

        if (!response.ok) {
            Toast.fire(dado.erro || "Erro ao fazer login");
            return;
        }

        const aluno_id = dado.aluno.id;
        const perfil = dado.aluno.perfil;

        // Salvar ID
        if (checkboxLembrar.checked) {
            localStorage.setItem("id", aluno_id);
            sessionStorage.removeItem("id");
        } else {
            sessionStorage.setItem("id", aluno_id);
            localStorage.removeItem("id");
        }

        // Redirecionar
        if (perfil === "aluno") {
            window.location.href = "../5.Usuario/index.html";
        } else {
            window.location.href = "../2.Dashboard/index.html";
        }

    } catch (error) {
        console.log("Erro:", error);
        Toast.fire("Erro de conexão com o servidor.");
    }

})
