const sessionId = sessionStorage.getItem("id");
const localId = localStorage.getItem("id");
const aluno_id = sessionId || localId;

if (!aluno_id) {
    window.location.replace("../../index.html");
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

const inputSenhaAtual = document.getElementById("senhaAtual")
const inputSenhaNova = document.getElementById("senhaNova")
const inputConfirmarSenha = document.getElementById("confirmarSenha")
const btnModificar = document.getElementById("btnModificar")
const formsModificarSenha = document.getElementById("formsModificarSenha")

const APILogin = `http://localhost:3000/login/${aluno_id}`

async function buscarSenhaDoBanco() {
    try {
        const response = await fetch(APILogin);
        if (!response.ok) {
            throw new Error('Erro na requisição à API');
        }

        const dados = await response.json();
        console.log('Dados recebidos:', dados);
        return dados;

    } catch (error) {
        console.error('Erro ao buscar dados:', error);

        Toast.fire({
            icon: "error",
            title: "Erro ao conectar ao servidor"
        });

        return null;
    }
}

function verificarSenha(senha) {
    const erros = [];

    if (!validator.isLength(senha, { min: 8 })) {
        erros.push("● Mínimo de 8 caracteres");
    }
    if (!/[a-z]/.test(senha)) {
        erros.push("● Pelo menos uma letra minúscula");
    }
    if (!/[A-Z]/.test(senha)) {
        erros.push("● Pelo menos uma letra maiúscula");
    }
    if (!/[0-9]/.test(senha)) {
        erros.push("● Pelo menos um número");
    }
    if (!/[^A-Za-z0-9]/.test(senha)) {
        erros.push("● Pelo menos um símbolo especial");
    }

    return erros;
}

btnModificar.addEventListener('click', async () => {
    console.log(aluno_id)
    console.log("click")
    const buscarSenha = await buscarSenhaDoBanco();

    if (!buscarSenha) return;

    console.log(buscarSenha)

    const senhaAtual = inputSenhaAtual.value;
    const senhaNova = inputSenhaNova.value;
    const confirmarSenha = inputConfirmarSenha.value;

    if (senhaAtual !== buscarSenha.senha) {
        Toast.fire({
            icon: "error",
            title: "Senha atual incorreta"
        });
        return;
    }

    if (senhaNova !== confirmarSenha) {
        Toast.fire({
            icon: "warning",
            title: "Senhas não coincidem"
        });
        return;
    }

    const resultado = verificarSenha(senhaNova);
    if (resultado.length > 0) {
        Toast.fire({
            icon: "warning",
            title: "Senha fraca",
            text: resultado.join(" | ")
        });
        return;
    }

    try {
        const requisicao = await fetch(APILogin, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senha: senhaNova })
        });

        if (requisicao.ok) {
            const dados = await requisicao.json();
            console.log("senha atualizada com sucesso:", dados);

            Swal.fire({
                title: "Senha atualizada!",
                icon: "success",
                draggable: true
            });

            formsModificarSenha.reset();
        } else {
            console.error("Erro na requisição:", requisicao.status);
            Toast.fire({
                icon: "error",
                title: "Erro ao mudar senha",
                text: "Código: " + requisicao.status
            });
        }

    } catch (error) {
        console.error("Erro no fetch:", error);

        Toast.fire({
            icon: "error",
            title: "Erro de conexão com o servidor"
        });
    }
});
function mostrarSenha1() {
    const input = document.getElementById("password1");
    const icon = input.parentElement.querySelector(".icon");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.add("hide");
    } else {
        input.type = "password";
        icon.classList.remove("hide");
    }
}

function mostrarSenha2() {
    const input = document.getElementById("password2");
    const icon = input.parentElement.querySelector(".icon");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.add("hide");
    } else {
        input.type = "password";
        icon.classList.remove("hide");
    }
}

function mostrarSenha3() {
    const input = document.getElementById("password3");
    const icon = input.parentElement.querySelector(".icon");
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.add("hide");
    } else {
        input.type = "password";
        icon.classList.remove("hide");
    }
}

document.getElementById("btnSair").addEventListener("click", () => {

    Swal.fire({
        title: "Deseja realmente sair?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, sair",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (result.isConfirmed) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "../../index.html";
        }

    });
});

const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menuFlutuante");

btnMenu.addEventListener("click", () => {
    menu.classList.toggle("abrir");
});

// Criar overlay para fechar o menu clicando fora
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

// Fechar menu ao clicar no overlay
overlay.addEventListener('click', () => {
    menu.classList.remove('abrir');
    overlay.classList.remove('active');
});

// Sincronizar overlay com menu
const observer = new MutationObserver(() => {
    if (menu.classList.contains('abrir')) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
});

observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
