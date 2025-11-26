async function carregarLayout() {
    const resposta = await fetch("../assets/layout/layout.html");
    const layout = await resposta.text();
    document.body.insertAdjacentHTML("afterbegin", layout);
}

carregarLayout();
