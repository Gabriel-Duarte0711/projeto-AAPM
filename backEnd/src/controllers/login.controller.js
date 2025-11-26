
import { db } from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// ============================
//  Rotas CRUD
// ============================

export async function listarLogin(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_login");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterLogin(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_login where aluno_id = ?",
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
      "UPDATE tabela_login SET senha = ? where aluno_id = ?",
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
      "SELECT id, nome, email FROM tabela_usuario WHERE email = ?",
      [email]
    );

    if (alunoRows.length === 0) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const aluno = alunoRows[0];

    const [loginRows] = await db.execute(
      "SELECT senha, perfil FROM tabela_login WHERE aluno_id = ?",
      [aluno.id]
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
      { id: aluno.id, email: aluno.email, perfil: dadosLogin.perfil },
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: lembrar
        ? 7 * 24 * 60 * 60 * 1000 // 7 dias
        : 2 * 60 * 60 * 1000
    })
    console.log("Login recebido:", req.body);
    console.log("Resultado do SELECT aluno:", alunoRows);
    return res.json({
      mensagem: "Login bem-sucedido",
      token: token,
      aluno: {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        perfil: dadosLogin.perfil
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
}