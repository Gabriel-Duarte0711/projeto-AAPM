const sessionId = sessionStorage.getItem("id");
const localId = localStorage.getItem("id");
const aluno_id = sessionId || localId;

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
        return dados; // retorna os dados para serem usados depois

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}
function verificarSenha(senha) {
    const erros = [];

    if (!validator.isLength(senha, { min: 8 })) {
        erros.push("Senha precisa ter pelo menos 8 caracteres;");
    }
    if (!/[a-z]/.test(senha)) {
        erros.push("Senha precisa ter pelo menos uma letra minúscula;");
    }
    if (!/[A-Z]/.test(senha)) {
        erros.push("Senha precisa ter pelo menos uma letra maiúscula;");
    }
    if (!/[0-9]/.test(senha)) {
        erros.push("Senha precisa ter pelo menos um número;");
    }
    if (!/[^A-Za-z0-9]/.test(senha)) {
        erros.push("Senha precisa ter pelo menos um símbolo especial;");
    }

    return erros;
}
btnModificar.addEventListener('click', async () => {
    console.log(aluno_id)
    console.log("click")
    const buscarSenha = await buscarSenhaDoBanco();

    console.log(buscarSenha)
    const senhaAtual = inputSenhaAtual.value;
    const senhaNova = inputSenhaNova.value;
    const confirmarSenha = inputConfirmarSenha.value;
    if (senhaAtual !== buscarSenha.senha) {
        Toast.fire('Senha atual incorreta');
        return;
    }

    if (senhaNova !== confirmarSenha) {
        Toast.fire("Senha nova e confirmação não coincidem");
        return;
    }

    const resultado = verificarSenha(senhaNova);
    if (resultado.length > 0) {
        Toast.fire("Senha fraca:\n" + resultado.join("\n"));
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
            Toast.fire("Erro ao mudar senha. Código: " + requisicao.status);
        }


    } catch (error) {
        console.error("Erro no fetch:", error);
        Toast.fire("Erro de conexão com o servidor.");
    }
})