const APIUsuarioDate = `http://localhost:3000/alunos/atualizar-data-encerramento`

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

async function carregarUsuario() {
    const btnDate = document.getElementById('btnDate');
    const dateInput = document.getElementById('dateInput');

    btnDate.addEventListener('click', async () => {
        const valor = dateInput.value;
        console.log('Valor selecionado:', valor);

        if (!valor) {
            Toast.fire("Por favor, selecione uma data!");
            return;
        }

        Swal.fire({
            title: "Tem certeza?",
            text: `Tem certeza que deseja atualizar a data de TODOS os alunos para ${valor}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, atualizar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                const requisicao = await fetch(APIUsuarioDate, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ data_encerramento: valor })
                });

                if (requisicao.ok) {
                    const dados = await requisicao.json();
                    console.log("Data atualizada com sucesso:", dados);
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    console.error("Erro na requisição:", requisicao.status);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: "Erro ao atualizar data. Código: " + requisicao.status
                    });
                }
            } catch (error) {
                console.error("Erro no fetch:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: "Erro de conexão com o servidor."
                });
            }
        });
    });
}

carregarUsuario();

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
