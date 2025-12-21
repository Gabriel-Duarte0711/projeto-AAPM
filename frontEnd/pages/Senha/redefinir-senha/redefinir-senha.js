
const password = document.getElementById('password')
const icon = document.getElementById('icon')

function mostrarSenha() {
  if (password.type === 'password') {
    password.setAttribute('type', 'text')
    icon.classList.add('hide')
  }
  else {
    password.setAttribute('type', 'password')
    icon.classList.remove('hide')
  }
}

const params = new URLSearchParams(window.location.search);
const email = params.get('email');
const inputSenha = document.getElementById("password");
const inputConfirmarSenha = document.getElementById("confirm-password");
const btnRedefinirSenha = document.getElementById("btnRedefinir");
const APIRedefinirSenha = `http://localhost:3000/verificacao/senha/${encodeURIComponent(email)}`;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

async function redefinirSenha(email, senha) {
  try {
    const resposta = await fetch(APIRedefinirSenha, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });
    const dados = await resposta.json();
    if (!resposta.ok) {
      throw new Error(dados.erro || "Erro ao redefinir senha.");
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
document.getElementById('formEnter').addEventListener('submit', async function (e) {
  e.preventDefault();
  const senha = inputSenha.value.trim();
  const confirmarSenha = inputConfirmarSenha.value.trim();
  if (senha === "" || confirmarSenha === "") {
    Toast.fire({
      icon: "warning",
      title: "Por favor, preencha todos os campos.",
    });
    return;
  }
  if (senha !== confirmarSenha) {
    Toast.fire({
      icon: "warning",
      title: "As senhas não coincidem.",
    });
    return;
  }
  const sucesso = await redefinirSenha(email, senha);
  if (sucesso) {
    // Redireciona para a página de login após redefinir a senha
    window.location.href = `../../index.html`;
  }
});