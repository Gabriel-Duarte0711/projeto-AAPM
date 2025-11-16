 async function carregarDados() {
            try {
                const resposta = await fetch("http://localhost:3000/armarios");
                const dados = await resposta.json();
                gerarCards(dados);
            } catch (erro) {
                console.error("Erro ao buscar dados:", erro);
            }
        }

        carregarDados();


        // ---------- FUNÇÃO PARA CRIAR OS CARDS ----------
        function gerarCards(lista) {

            const template = document.getElementById("card-template").innerHTML;
            const container = document.getElementById("card-container");

            container.innerHTML = "";

            lista.forEach(item => {

                const card = document.createElement("div");
               
                

                card.innerHTML = template;

                card.querySelector(".armario").innerText = item.armario;
                card.querySelector(".aluno").innerText = item.aluno;
                card.querySelector(".telefone").innerText = item.telefone;
                card.querySelector(".email").innerText = item.email;
                card.querySelector(".curso").innerText = item.curso;

                container.appendChild(card.firstElementChild);
            });
        }

        gerarCards();