const APICriarCodigo = "http://localhost:3000/verificacao";

const inputEmail = document.getElementById("email");
const btnEnviarCodigo = document.getElementById("btnEnviar");
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

async function enviarCodigo(email) {
  try {
    const resposta = await fetch(APICriarCodigo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || "Erro ao enviar código de verificação.");
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

btnEnviarCodigo.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = inputEmail.value.trim();
  if (email === "") {
    Toast.fire({
      icon: "warning",
      title: "Por favor, insira seu email.",
    });
    return;
  }
  const sucesso = await enviarCodigo(email);
  if (sucesso) {
    // Redireciona para a página de redefinição de senha após enviar o código
    window.location.href = `../../Senha/codigo-senha/codigo-senha.html?email=${encodeURIComponent(
      email
    )}`;
  }
});
