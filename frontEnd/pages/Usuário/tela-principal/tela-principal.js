const sessionId = sessionStorage.getItem("id");
const localId = localStorage.getItem("id");
const id = sessionId || localId;
const APIUsuario = `http://localhost:3000/usuario/${id}`
const APIUsuarioDate = `http://localhost:3000/usuario`
const saudacoes = document.getElementById('saudacoes')
const numArmario = document.getElementById('numArmario')
const dataFim = document.getElementById('dataFim')

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

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

async function carregarUsuario() {
    const usuario = await buscarUsuarioDoBanco();

    const data = new Date(usuario.data_encerramento);
    const dataFormatada = data.toLocaleDateString("pt-BR");

    saudacoes.textContent = `Olá, ${usuario.nome}`;
    numArmario.textContent = `Número do armário: ${usuario.armario_id}`
    dataFim.textContent = `Data de encerramento: ${dataFormatada}`


    const btnTeste = document.getElementById('btnTeste')
    const dateTeste = document.getElementById('data')

    btnTeste.addEventListener('click', async () => {
        const valor = dateTeste.value; // formato: "2025-11-15"
        console.log('Valor selecionado:', valor);

        try {
        const requisicao = await fetch(APIUsuarioDate, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data_encerramento: valor})
        });

        if (requisicao.ok) {
            const dados = await requisicao.json();
            console.log("data atualizada com sucesso:", dados);
            Toast.fire("data atualizada com sucesso!");
        } else {
            console.error("Erro na requisição:", requisicao.status);
            Toast.fire("Erro ao fazer mudar data. Código: " + requisicao.status);
        }


    } catch (error) {
        console.error("Erro no fetch:", error);
        Toast.fire("Erro de conexão com o servidor.");
    }
    })
}

carregarUsuario();


// teste
