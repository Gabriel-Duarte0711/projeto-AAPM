const APIArmario = "http://localhost:3000/armarios"
const APIUsuario = "http://localhost:3000/usuario"
const APIUsuarioArmario = "http://localhost:3000/armarios/obterUsuario"

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

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
        const response = await fetch(APIUsuarioArmario);
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

            if (user) {

                let pagamentoTexto = "";
                if (user.pagamento === "A") {
                    pagamentoTexto = "Dinheiro";
                } else if (user.pagamento === "C") {
                    pagamentoTexto = "Cartão de crédito";
                } else if (user.pagamento === "D") {
                    pagamentoTexto = "Cartão de débito";
                } else if (user.pagamento === "P") {
                    pagamentoTexto = "Pix";
                } else {
                    pagamentoTexto = "Não informado";
                }

                const data = new Date(user.data_encerramento);
                const dataFormatada = data.toLocaleDateString("pt-BR");
                infos.innerHTML += `
            <p class="info" data-nome="${user.nome}"><strong>Aluno:</strong> <span class="aluno" >${user.nome}</span></p>
            <p class="info" data-cpf="${user.CPF}"></p>
            <p class="info" data-matricula="${user.matricula}"></p>
            <p class="info" data-telefone="${user.telefone}"></p>
            <p class="info" data-email="${user.email}"></p>
            <p class="info" data-curso="${user.curso}"></p>
            <p class="info" data-turma="${user.turma}"></p>
            <p class="info" data-pagamento="${user.pagamento}"></p>
            <p class="info" data-encerramento="${dataFormatada}"></p>`;
                const popup = document.querySelector(".exibirPop");
                const pop = document.querySelector(".pop");
                function abrirPopup(user) {
                    pop.innerHTML = "";
                    pop.innerHTML = `
                    <h2 class="pop-title">${user.nome}</h2>

                    <div class="pop-info-group">
                        <p><span>Telefone:</span> ${user.telefone}</p>
                        <p><span>CPF:</span> ${user.CPF}</p>
                        <p><span>Email:</span> ${user.email}</p>
                        <p><span>Curso:</span> ${user.curso}</p>
                        <p><span>Turma:</span> ${user.turma}</p>
                        <p><span>Pagamento:</span> ${pagamentoTexto}</p>
                        <p><span>Data de encerramento:</span> ${dataFormatada}</p>
                    </div>

                    <div class="pop-buttons">
                        <button type="button" id="btnExcluir">Excluir</button>
                        <a href="../editar-usuario/editar-usuario.html?id=${user.id}">
                            <button type="button" id="btnAtualizar">Editar</button>
                        </a>
                    </div>
                    `;

                    popup.style.display = "flex";
                    // BOTAO DE EXCLUIR
                    const btnExcluir = document.getElementById("btnExcluir")

                    btnExcluir.addEventListener("click", async () => {
                        Swal.fire({
                            title: "Tem certeza?",
                            text: "Essa ação irá remover o aluno e liberar o armário!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Sim, excluir",
                            cancelButtonText: "Cancelar"
                        }).then(async (result) => {
                            if (!result.isConfirmed) return;

                            try {
                                const APIDeleteUser = `${APIUsuario}/${user.id}`;
                                const requisicao = await fetch(APIDeleteUser, {
                                    method: "DELETE",
                                    headers: { "Content-Type": "application/json" },
                                });

                                const APIArmarioComNumero = `${APIArmario}/${item.numero_armario}`;
                                const atualizarEstadoArmario = await fetch(APIArmarioComNumero, {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ estado: "D" })
                                });

                                if (requisicao.ok && atualizarEstadoArmario.ok) {
                                    Swal.fire({
                                        title: "Excluído!",
                                        text: "O aluno foi removido e o armário liberado.",
                                        icon: "success",
                                        timer: 1500,
                                        showConfirmButton: false
                                    });

                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1500);

                                } else {
                                    Swal.fire({
                                        title: "Erro!",
                                        text: "Erro ao excluir o aluno.",
                                        icon: "error"
                                    });
                                }

                            } catch (error) {
                                console.error("Erro no fetch:", error);

                                Swal.fire({
                                    title: "Erro!",
                                    text: "Erro de conexão com o servidor.",
                                    icon: "error"
                                });
                            }
                        });
                    });

                }
                card.addEventListener('click', () => {
                    abrirPopup(user);
                })
                popup.addEventListener("click", (e) => {
                    if (e.target === popup) {
                        popup.style.display = "none";
                    }
                });
            }

            card.classList.add("ocupado");

        } else if (item.estado === "M") {
            // MANUNTECAO
            card.setAttribute('data-estado', item.estado)
            estado = "EM MANUNTEÇÂO"
            const popup = document.querySelector(".exibirPop");
            const pop = document.querySelector(".pop");
            function abrirPopupManutencao() {
                pop.innerHTML = "";
                pop.innerHTML = `
                         <select class="select" id="select-estado" name="turma_id">
                         <option selected disabled>selecione o estado do armário</option>
                         <option value="D">DISPONÍVEL</option>
                         </select>
                         <button id="atualizrEstado">Atualizar</button>`
                    ;
                const att = document.getElementById("atualizrEstado")
                att.addEventListener('click', async () => {
                    const dropDownEstado = document.getElementById('select-estado')
                    const valor = dropDownEstado.value

                    try {
                        const APIArmarioComNumero = `${APIArmario}/${item.numero_armario}`;
                        const requisicao = await fetch(APIArmarioComNumero, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ estado: valor })
                        });

                        if (requisicao.ok) {
                            const dados = await requisicao.json();
                            console.log("armario atualizada com sucesso:", dados);
                            Swal.fire({
                                title: "Atualizado!",
                                text: "O estado do armário foi atualizado!",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500);
                        } else {
                            console.error("Erro na requisição:", requisicao.status);
                            Toast.fire("Erro ao fazer mudar armario. Código: " + requisicao.status);
                        }


                    } catch (error) {
                        console.error("Erro no fetch:", error);
                        Toast.fire("Erro de conexão com o servidor.");
                    }
                })

                popup.style.display = "flex";
            }
            card.addEventListener('contextmenu', function (event) {
                if (event.button === 2) {
                    event.preventDefault();
                    console.log("clique direito")
                    abrirPopupManutencao();
                }
            })
            popup.addEventListener("click", (e) => {
                if (e.target === popup) {
                    popup.style.display = "none";
                }
            });
            infos.innerHTML += `<p class="info"><strong>Estado:</strong> <span class="estado" id="aluno">${estado}</span></p>`
            card.classList.add("manutencao");

        } else if (item.estado === "D") {
            // DISPONIVEL
            card.setAttribute('data-estado', item.estado)
            estado = "DISPONIVEL"

            const popup = document.querySelector(".exibirPop");
            const pop = document.querySelector(".pop");
            function abrirPopupManutencao() {
                pop.innerHTML = "";
                pop.innerHTML = `
                         <select class="select" id="select-estado" name="turma_id">
                         <option selected disabled>selecione o estado do armário</option>
                         <option value="M">MANUTENCAO</option>
                         </select>
                         <button id="atualizrEstado">Atualizar</button>`
                    ;
                const att = document.getElementById("atualizrEstado")
                att.addEventListener('click', async () => {
                    const dropDownEstado = document.getElementById('select-estado')
                    const valor = dropDownEstado.value

                    try {
                        const APIArmarioComNumero = `${APIArmario}/${item.numero_armario}`;
                        const requisicao = await fetch(APIArmarioComNumero, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ estado: valor })
                        });

                        if (requisicao.ok) {
                            const dados = await requisicao.json();
                            console.log("armario atualizada com sucesso:", dados);
                            Swal.fire({
                                title: "Atualizado!",
                                text: "O estado do armário foi atualizado!",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500);
                        } else {
                            console.error("Erro na requisição:", requisicao.status);
                            Toast.fire("Erro ao fazer mudar armario. Código: " + requisicao.status);
                        }


                    } catch (error) {
                        console.error("Erro no fetch:", error);
                        Toast.fire("Erro de conexão com o servidor.");
                    }
                })

                popup.style.display = "flex";
            }
            card.addEventListener('click', () => {
                window.localStorage.setItem('armarioSelecionado', item.numero_armario);
                window.localStorage.setItem('armarioEstado', item.estado);
                window.location.href = "../cadastrar-usuario/cadastrar-usuario.html"
            })
            card.addEventListener('contextmenu', function (event) {
                if (event.button === 2) {
                    event.preventDefault();
                    console.log("clique direito")
                    abrirPopupManutencao();
                }
            })
            popup.addEventListener("click", (e) => {
                if (e.target === popup) {
                    popup.style.display = "none";
                }
            });
            infos.innerHTML += `<p class="info"><strong>Estado:</strong> <span class="estado" id="aluno">${estado}</span></p>`

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
                checkDisponivel.checked = false
                checkManutencao.checked = false
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
                checkDisponivel.checked = false
                checkOcupado.checked = false
            } else {
                armario.style.display = 'flex'; // esconde
            }
        })
    })
    checkDisponivel.addEventListener('change', () => {
        armarios.forEach(armario => {
            if (checkDisponivel.checked) {
                armario.style.display = armario.classList.contains('disponivel') ? 'flex' : 'none'; // mostra
                checkOcupado.checked = false
                checkManutencao.checked = false
            } else {
                armario.style.display = 'flex'; // esconde
            }
        })
    })



}
carregarArmarios();