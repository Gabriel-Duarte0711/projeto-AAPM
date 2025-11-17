const APIArmario = "http://localhost:3000/armarios"
const APIUsuario = "http://localhost:3000/armarios/obterUsuario"
async function buscarArmariosDoBanco() {
    try {
        const response = await fetch(APIArmario);
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

async function buscarUserDoBanco() {
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


async function carregarArmarios() {
    const dadosArmarios = await buscarArmariosDoBanco();
    const dadosUsuario = await buscarUserDoBanco();
    const container = document.getElementById("card-container");

    container.innerHTML = "";
    dadosArmarios.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute('data-numero', item.numero_armario)
        const infos = document.createElement("div");
        infos.classList.add("infos")
        let estado;
        ;
        infos.innerHTML += `<p class="info"><strong>Armario:</strong> <span class="armario">${item.numero_armario}</span></p>`;

        if (item.estado === "O") {
            // OCUPADO 
            const user = dadosUsuario.find(u => u.numero_armario === item.numero_armario);
            card.setAttribute('data-estado', item.estado)
            const data = new Date(user.data_encerramento); 
            const dataFormatada = data.toLocaleDateString("pt-BR");
            if (user) {

                infos.innerHTML += `
            <p class="info" data-nome="${user.nome}"><strong>Aluno:</strong> <span class="aluno" >${user.nome}</span></p>
            <p class="info" data-telefone="${user.telefone}"><strong>Telefone:</strong> <span class="telefone" >${user.telefone}</span></p>
            <p class="info" data-email="${user.email}"><strong>Email:</strong> <span class="email" >${user.email}</span></p>
            <p class="info" data-curso="${user.curso}"><strong>Curso:</strong> <span class="curso" >${user.curso}</span></p>
            <p class="info" data-turma="${user.turma}"><strong>Turma:</strong> <span class="turma" >${user.turma}</span></p>
            <p class="info" data-data="${dataFormatada}"><strong>Data de encerramento:</strong> <span class="data" >${dataFormatada}</span></p>`;
            }

            card.classList.add("ocupado");

        } else if (item.estado === "M") {
            // MANUNTECAO
            card.setAttribute('data-estado', item.estado)
            estado = "EM MANUNTEÇÂO"

            infos.innerHTML += `<p class="info"><strong>Estado:</strong> <span class="estado" id="aluno">${estado}</span></p>`
            card.classList.add("manutencao");
        } else if (item.estado === "D") {
            // DISPONIVEL
            card.setAttribute('data-estado', item.estado)
            estado = "DISPONIVEL"

            infos.innerHTML += `<p class="info"><strong>Estado:</strong> <span class="estado">${estado}</span></p>`

            card.classList.add("disponivel");
        }


        card.appendChild(infos);
        container.appendChild(card);
    });

    const armarios = document.querySelectorAll('.card')
    const inputPesquisa = document.getElementById('pesquisa')
    inputPesquisa.addEventListener('input', () => {
        const termo = inputPesquisa.value.toLowerCase().trim();

        armarios.forEach(armario => {


            const nome = armario.querySelector('.info[data-nome]')?.dataset.nome?.toLowerCase() ?? ""
            const telefone = armario.querySelector('.info[data-telefone]')?.dataset.telefone?.toLowerCase() ?? ""
            const email = armario.querySelector('.info[data-email]')?.dataset.email?.toLowerCase() ?? ""
            const curso = armario.querySelector('.info[data-curso]')?.dataset.curso?.toLowerCase() ?? ""
            const turma = armario.querySelector('.info[data-turma]')?.dataset.turma?.toLowerCase() ?? ""
            const numero = armario.dataset.numero?.toLowerCase() ?? "";


            if (numero.includes(termo) || nome.includes(termo) || telefone.includes(termo) || email.includes(termo) || curso.includes(termo) || turma.includes(termo)) {
                armario.style.display = 'flex'; // mostra

            } else {
                armario.style.display = 'none'; // esconde
            }


        })
    })

    const checkOcupado = document.getElementById('checkOcupado')
    const checkManutencao = document.getElementById('checkManutencao')
    const checkDisponivel = document.getElementById('checkDisponivel')
    checkOcupado.addEventListener('change', () => {
        armarios.forEach(armario => {
            if (checkOcupado.checked) {
                armario.style.display = armario.classList.contains('ocupado') ? 'flex' : 'none'; // mostra
            } else {
                armario.style.display = 'flex'; // esconde
            }
        })
    }
    )
    checkManutencao.addEventListener('change', () => {
        armarios.forEach(armario => {
            if (checkManutencao.checked) {
                armario.style.display = armario.classList.contains('manutencao') ? 'flex' : 'none'; // mostra
            } else {
                armario.style.display = 'flex'; // esconde
            }
        })
    })
    checkDisponivel.addEventListener('change', () => {
        armarios.forEach(armario => {
            if (checkDisponivel.checked) {
                armario.style.display = armario.classList.contains('disponivel') ? 'flex' : 'none'; // mostra
            } else {
                armario.style.display = 'flex'; // esconde
            }
        })
    })

}
carregarArmarios();