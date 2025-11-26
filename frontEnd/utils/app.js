async function carregarLayout() {

    try {
        const response = await fetch('/frontend/assets/layout/layout.html');
        const layout = await response.text(); 
        document.body.insertAdjacentHTML("afterbegin", layout);

        inicializarDarkMode();

    } catch (erro) {
        console.error("Erro ao carregar o layout:", erro);
    }
}

carregarLayout();

function inicializarDarkMode() {

    const btn = document.getElementById("toggleDark");

    if (!btn) {
        console.warn("Botão de dark mode não encontrado. Tentando novamente...");
        setTimeout(inicializarDarkMode, 100);
        return;
    }

    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark-mode");
    }

    btn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const temaAtual = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("tema", temaAtual);

        btn.textContent = temaAtual === "dark" ? "☀️" : "🌙";
    });
}
