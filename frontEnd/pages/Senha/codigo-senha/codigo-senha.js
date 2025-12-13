const params = new URLSearchParams(window.location.search);
const email = params.get('email');
const APIVerificarCodigo = "http://localhost:3000/verificacao/verificar";
const inputs = document.querySelectorAll(".input-codigo");
const btnVerificar = document.getElementById('btnVerificar');
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
});

// Eventos de navegação entre inputs
inputs.forEach((input, index) => {

    // Avançar automaticamente ao digitar
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Voltar ao apagar
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
        }
    });

});

// Evento do botão (fora do forEach!)
btnVerificar.addEventListener('click', async () => {
    let codigoDigitado = "";

    inputs.forEach(input => {
        codigoDigitado += input.value;
    });

    const sucesso = await verificarCodigo(email, codigoDigitado);
    if (sucesso) {
      // Redireciona para a página de redefinição de senha após verificar o código
        window.location.href = `../redefinir-senha/redefinir-senha.html?email=${encodeURIComponent(email)}`;
    } else {
        Toast.fire({
        icon: "warning",
        title: "Por favor, insira o código de verificação correto.",
      });
    }
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

// btnVerificarCodigo.addEventListener("click", async (e) => {
//     e.preventDefault();
//     const codigo = inputCodigo.value.trim();
//     if (codigo === "") {
//       Toast.fire({
//         icon: "warning",
//         title: "Por favor, insira o código de verificação.",
//       });
//       return;
//     }
//     const sucesso = await verificarCodigo(email, codigo);
//     if (sucesso) {
//       // Redireciona para a página de redefinição de senha após verificar o código
//         window.location.href = `../redefinir-senha/redefinir-senha.html?email=${encodeURIComponent(email)}`;
//     }
// });