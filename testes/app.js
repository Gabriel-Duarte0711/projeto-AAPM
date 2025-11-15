
// atualizar data do banco
const APIUsuarioDate = `http://localhost:3000/usuario`



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
            alert("data atualizada com sucesso!");
        } else {
            console.error("Erro na requisição:", requisicao.status);
            alert("Erro ao fazer mudar data. Código: " + requisicao.status);
        }


    } catch (error) {
        console.error("Erro no fetch:", error);
        alert("Erro de conexão com o servidor.");
    }
    })
}

carregarUsuario();


// teste
