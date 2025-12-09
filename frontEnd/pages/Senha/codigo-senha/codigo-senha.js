const params = new URLSearchParams(window.location.search);
const email = params.get('email');
const inputCodigo = document.getElementById("codigo");
const btnVerificarCodigo = document.getElementById("btnVerificar");
const APIVerificarCodigo = "http://localhost:3000/verificacao/verificar";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

async function verificarCodigo(email, codigo) {
  try {
    const resposta = await fetch(APIVerificarCodigo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, codigo }),
    });
    const dados = await resposta.json();
    if (!resposta.ok) {
      throw new Error(dados.erro || "Erro ao verificar código.");
    }
    Toast.fire({
      icon: "success",
      title: dados.mensagem,
    });
    return true;
  } catch (erro) {
    Toast.fire({
      icon: "error",
      title: erro.message,
    });
    return false;
  }
}

btnVerificarCodigo.addEventListener("click", async (e) => {
    e.preventDefault();
    const codigo = inputCodigo.value.trim();
    if (codigo === "") {
      Toast.fire({
        icon: "warning",
        title: "Por favor, insira o código de verificação.",
      });
      return;
    }
    const sucesso = await verificarCodigo(email, codigo);
    if (sucesso) {
      // Redireciona para a página de redefinição de senha após verificar o código
        window.location.href = `../redefinir-senha/redefinir-senha.html?email=${encodeURIComponent(email)}`;
    }
});