// js/auth.js (frontend)
export async function verificarLogin() {
  try {
    const response = await fetch("http://localhost:3000/alunos/me", {
      credentials: "include" // envia o cookie que foi salvo pelo backend
    });

    if (!response.ok) {
      window.location.href = "../../index.html"; // redireciona se não tiver login
      return;
    }

    const data = await response.json();
    return data.usuario; // retorna os dados do usuário
  } catch (err) {
    window.location.href = "../../index.html";
  }
}
