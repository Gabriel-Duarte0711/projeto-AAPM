const dropDownCurso = document.getElementById('select-curso')
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

// cadastro de um aluno
const APIUsuario = `http://localhost:3000/alunos/${aluno_id}`

const formCadastrar = document.getElementById("formsCadastro")

async function carregarUsuario() {
    // Mostrar loading
    const infoValues = document.querySelectorAll('.info-value');
    infoValues.forEach(value => {
        value.textContent = '';
        value.classList.add('loading');
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
    console.log(usuarios.turma_id)
    console.log(turmas)
    
    // Remover loading
    infoValues.forEach(value => value.classList.remove('loading'));

    // Preencher os campos usando .info-value
    const campos = document.querySelectorAll('.info-section');
    campos[0].querySelector('.info-value').textContent = usuarios.nome;
    campos[1].querySelector('.info-value').textContent = usuarios.CPF;
    campos[2].querySelector('.info-value').textContent = usuarios.matricula;
    campos[3].querySelector('.info-value').textContent = usuarios.telefone;
    campos[4].querySelector('.info-value').textContent = usuarios.email;
    campos[5].querySelector('.info-value').textContent = cursos.nome;
    campos[6].querySelector('.info-value').textContent = turmas.turma;
    
    if (usuarios) {
        let pagamentoTexto = ""
        if (usuarios.pagamento === "A") {
            pagamentoTexto = "Dinheiro";
        } else if (usuarios.pagamento === "C") {
            pagamentoTexto = "Cartão de crédito";
        } else if (usuarios.pagamento === "D") {
            pagamentoTexto = "Cartão de débito";
        } else if (usuarios.pagamento === "P") {
            pagamentoTexto = "Pix";
        } else {
            pagamentoTexto = "Não informado";
        }

        campos[7].querySelector('.info-value').textContent = pagamentoTexto;
    }
}
carregarUsuario()

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

// PEDI PRA IA FAZER ESSA PARTE SÓ PRA PODER VER COMO O FRONT IA FICAR