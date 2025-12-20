
const APIArmario = "http://localhost:3000/armarios";
const APIUsuarioArmario = "http://localhost:3000/armarios/obterUsuario";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

const estados = {
  O: { classe: "ocupado", texto: "Ocupado" },
  D: { classe: "disponivel", texto: "Disponível" },
  M: { classe: "manutencao", texto: "Em manutenção"},
};

async function buscarDados(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro na API");
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

function criarCardArmario(armario, usuario) {
  const estado = estados[armario.estado];
  const card = document.createElement("div");
  const infos = document.createElement("div");

  card.className = `card ${estado.classe}`;
  card.dataset.numero = armario.numero_armario;
  card.dataset.estado = armario.estado;

  infos.classList.add("infos");
  if (armario.estado === "O") {
    const user = usuario.find((u) => u.id_armario === armario.numero_armario);

    infos.innerHTML = `
      <p class="info">
        <strong>Armário:</strong>
        <span>${armario.numero_armario}</span>
      </p>
      <p class="info" data-nome="${user?.nome ?? ""}">
        <strong>Aluno:</strong>
        <span>${user?.nome ?? "Desconhecido"}</span>
      </p>
    `;
  } else {
    infos.innerHTML = `
      <p class="info">
        <strong>Armário:</strong>
        <span>${armario.numero_armario}</span>
      </p>
      <p class="info">
        <strong>Estado:</strong>
        <span>${estado.texto}</span>
      </p>
    `;
  }
  card.appendChild(infos);
  return card;
}

function carregarArmario(armarios, usuarios) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  armarios.forEach((armario) => {
    const card = criarCardArmario(armario, usuarios);
    container.appendChild(card);
  });
}

function pesquisar() {
  const input = document.getElementById("pesquisa");
  const cards = document.querySelectorAll(".card");

  input.addEventListener("input", () => {
    const termo = input.value.toLowerCase().trim();

    cards.forEach((card) => {
      const campos = [
        card.dataset.numero,
        card.querySelector("[data-nome]")?.dataset.nome,
      ];

      const encontrado = campos.some((v) =>
        (v ?? "").toLowerCase().includes(termo)
      );

      card.style.display = encontrado ? "flex" : "none";
    });
  });
}

function filtrar() {
  const cards = document.querySelectorAll(".card");

  const filtros = {
    ocupado: document.getElementById("checkOcupado"),
    manutencao: document.getElementById("checkManutencao"),
    disponivel: document.getElementById("checkDisponivel"),
  };

  function ativarFiltro(tipo) {
    const ativo = filtros[tipo].classList.toggle("ativo");

    Object.keys(filtros).forEach((k) => {
      if (k !== tipo) filtros[k].classList.remove("ativo");
    });

    cards.forEach((card) => {
      card.style.display =
        !ativo || card.classList.contains(tipo) ? "flex" : "none";
    });
  }

  Object.keys(filtros).forEach((tipo) => {
    filtros[tipo].addEventListener("click", () => ativarFiltro(tipo))
  })
}

async function iniciar() {
    const armarios = await buscarDados(APIArmario)
    const usuarios = await buscarDados(APIUsuarioArmario)

    carregarArmario(armarios, usuarios)
    pesquisar()
    filtrar()
}

iniciar();

// async function carregarArmarios() {
//   const dadosArmarios = await buscarDados(APIArmario);
//   const dadosUsuario = await buscarDados(APIUsuarioArmario);

//   let estado = "disponivel";

//   const container = document.getElementById("card-container");
//   container.innerHTML = "";
//   dadosArmarios.forEach((armario) => {
//     const card = document.createElement("div");
//     const divInfos = document.createElement("div");

//     const estado = estados[armario.estado];

//     card.classList.add("card", estado);
//     card.setAttribute("data-numero", armario.numero_armario);
//     card.setAttribute("data-estado", armario.estado);
//     divInfos.classList.add("infos");
//     if (armario.estado === "O") {
//       const user = dadosUsuario.find(
//         (u) => u.id_armario === armario.numero_armario
//       );
//       divInfos.innerHTML = `
//             <p class="info">
//                 <strong>Armário:</strong>
//                 <span class="armario">${armario.numero_armario}</span>
//             </p>
//             <p class="info">
//                 <strong>Aluno:</strong>
//                 <span class="aluno">${user.nome}</span>
//             </p>
//         `;
//     } else {
//       divInfos.innerHTML = `
//             <p class="info">
//                 <strong>Armário:</strong>
//                 <span class="armario">${armario.numero_armario}</span>
//             </p>
//             <p class="info">
//                 <strong>Estado:</strong>
//                 <span class="estado">${estado}</span>
//             </p>
//         `;
//     }

//     card.appendChild(divInfos);
//     container.appendChild(card);
//   });

//   const armarios = document.querySelectorAll(".card");
//   const inputPesquisa = document.getElementById("pesquisa");

//   inputPesquisa.addEventListener("input", () => {
//     const termo = inputPesquisa.value.toLowerCase().trim();

//     armarios.forEach((armario) => {
//       const campos = [
//         armario.dataset.numero,
//         armario.querySelector(".info[data-nome]")?.dataset.nome,
//         armario.querySelector(".info[data-cpf")?.dataset.cpf,
//         armario.querySelector(".info[data-email]")?.dataset.email,
//       ];

//       const encontrado = campos.some((valor) =>
//         (valor ?? "").toLowerCase().includes(termo)
//       );

//       armario.style.display = encontrado ? "flex" : "none";
//     });
//   });
//   //obj que guarda os valores de filtros
//   const filtros = {
//     ocupado: document.getElementById("checkOcupado"),
//     manutencao: document.getElementById("checkManutencao"),
//     disponivel: document.getElementById("checkDisponivel"),
//   };

//   // funcao pra filtrar
//   function ativarFiltro(tipo) {
//     const filtroAtivo = filtros[tipo].classList.toggle("ativo");

//     Object.keys(filtros).forEach((key) => {
//       if (key !== tipo) filtros[key].classList.remove("ativo");
//     });

//     armarios.forEach((armario) => {
//       if (!filtroAtivo) {
//         armario.style.display = "flex";
//         return;
//       }

//       armario.style.display = armario.classList.contains(tipo)
//         ? "flex"
//         : "none";
//     });
//   }

//   Object.keys(filtros).forEach((tipo) => {
//     filtros[tipo].addEventListener("click", () => ativarFiltro(tipo));
//   });
// }

// carregarArmarios();
