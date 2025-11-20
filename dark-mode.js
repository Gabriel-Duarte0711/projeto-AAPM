// darkmode.js
const btn = document.getElementById("toggleDark");

if (btn) { // só executa se o botão existir na página
    // 1 - aplica o tema salvo
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark-mode");
    }

    // 2 - ajusta o ícone
    btn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

    // 3 - alterna o tema ao clicar
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const temaAtual = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("tema", temaAtual);

        btn.textContent = temaAtual === "dark" ? "☀️" : "🌙";
    });
}
