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
