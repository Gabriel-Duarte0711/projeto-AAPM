
import { db } from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// ============================
//  Rotas CRUD
// ============================

export async function listarLogin(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_usuario");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterLogin(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_usuario where aluno_id = ?",
      [req.params.aluno_id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function atualizarSenha(req, res) {
  try {
    const { senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10)
    await db.execute(
      "UPDATE tabela_usuario SET senha = ? where aluno_id = ?",
      [hashedPassword, req.params.aluno_id]
    );
    res.json({ mensagem: "senha atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function login(req, res) {
  try {
    const { email, senha, lembrar } = req.body;


    const [alunoRows] = await db.execute(
      "SELECT id, nome, email, id_usuario FROM tabela_alunos WHERE email = ?",
      [email]
    );

    const [adminRows] = await db.execute(
      "SELECT id, nome, email, id_usuario FROM tabela_admin WHERE email = ?",
      [email]
    );

    const usuario = alunoRows[0] || adminRows[0];
    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const [loginRows] = await db.execute(
      "SELECT senha, perfil FROM tabela_usuario WHERE id = ?",
      [usuario.id_usuario],
    )

    if (loginRows.length === 0) {
      return res.status(400).json({ erro: "Login não configurado para este usuário" });
    }

    const dadosLogin = loginRows[0];

    const senhaCorreta = await bcrypt.compare(senha, dadosLogin.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, perfil: dadosLogin.perfil },
      process.env.JWT_SECRET,
      { expiresIn: lembrar ? "168h" : "2h" }
    );

    return res.json({
      mensagem: "Login bem-sucedido",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: dadosLogin.perfil
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
}