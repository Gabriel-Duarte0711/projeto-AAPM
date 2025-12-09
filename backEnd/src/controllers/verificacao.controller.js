import { db } from "../config/db.js";
import bcrypt from "bcrypt"

export async function criarCodigo(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ erro: "Campos obrigatórios" });

    

    const [users] = await db.execute(
      "SELECT email FROM tabela_admin WHERE email = ? UNION SELECT email FROM tabela_alunos WHERE email = ?",
      [email, email]
    );
    if (users.length === 0) {
      return res.status(404).json({ erro: "Email não encontrado" });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expiracao = new Date(Date.now() + 15 * 60 * 1000);
    const expiracaoFormatada = expiracao
      .toLocaleString("sv-SE", { hour12: false })
      .replace(",", "");

    const [resultado] = await db.execute(
      "INSERT INTO tabela_verificacao (email, codigo, expiracao) VALUES (?, ?, ?)",
      [email, codigo, expiracaoFormatada]
    );

    res.status(201).json({ mensagem: "Código enviado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR CÓDIGO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function verificarCodigo(req, res) {
  try {
    const { email, codigo } = req.body;
    if (!email || !codigo)
      return res.status(400).json({ erro: "Campos obrigatórios" });
    const [registros] = await db.execute(
      "SELECT * FROM tabela_verificacao WHERE email = ? AND codigo = ? ORDER BY expiracao DESC LIMIT 1",
      [email, codigo]
    );
    if (registros.length === 0) {
      return res.status(404).json({ erro: "Código inválido" });
    }
    const registro = registros[0];
    const agora = new Date();
    const expiracao = new Date(registro.expiracao);
    if (agora > expiracao) {
      return res.status(400).json({ erro: "Código expirado" });
    }
    res.json({ mensagem: "Código verificado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO VERIFICAR CÓDIGO:", err);
    res.status(500).json({ erro: err.message });
  }
}


export async function limparCodigosAntigos() {
  try {
    const agora = new Date();
    const agoraFormatada = agora
      .toLocaleString("sv-SE", { hour12: false })
      .replace(",", "");
    await db.execute(
      "DELETE FROM tabela_verificacao WHERE expiracao < ?",
      [agoraFormatada]
    );
    console.log("🧹 Códigos de verificação antigos limpos com sucesso.");
  } catch (err) {
    console.error("❌ ERRO AO LIMPAR CÓDIGOS ANTIGOS:", err);
  }
}

// Agendar a limpeza de códigos antigos a cada hora
setInterval(limparCodigosAntigos, 60 * 60 * 1000);

// export async function atualizarSenha(req, res) {
//   try {
//     const { senha } = req.body;
//     const hashedPassword = await bcrypt.hash(senha, 10)
//     await db.execute(
//       "UPDATE tabela_usuario SET senha = ? where aluno_id = ?",
//       [hashedPassword, req.params.aluno_id]
//     );
//     res.json({ mensagem: "senha atualizada com sucesso!" });
//   } catch (err) {
//     res.status(500).json({ erro: err.message });
//   }
// };

export async function atualizarSenha(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Campos obrigatórios" });
    }

    const [users] = await db.execute(
      "SELECT id_usuario FROM tabela_alunos WHERE email = ? UNION SELECT id_usuario FROM tabela_admin WHERE email = ?",
      [email, email]
    );

    if (users.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const userId = users[0].id_usuario;
    const hashedPassword = await bcrypt.hash(senha, 10);

    await db.execute(
      "UPDATE tabela_usuario SET senha = ? WHERE id = ?",
      [hashedPassword, userId]
    );
    res.json({ mensagem: "Senha atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};