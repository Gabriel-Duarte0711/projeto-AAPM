// ---- CARREGAR TEMA SALVO ----
const savedTheme = localStorage.getItem("theme");

// aplica o tema salvo, se existir
if (savedTheme) {
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
}

// ---- BOTÃO DE TROCA DE TEMA ----
const btn = document.getElementById("toggleDark");

if (btn) {
    btn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme") || "light";

        const newTheme = currentTheme === "light" ? "dark" : "light";

        // aplica
        document.documentElement.setAttribute("data-bs-theme", newTheme);

        // salva
        localStorage.setItem("theme", newTheme);

        // muda o ícone do botão
        btn.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
}

// deixa o ícone correto ao carregar a página
if (savedTheme === "dark" && btn) btn.textContent = "☀️";
