
import { db } from "../config/db.js"
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
    await db.execute(
      "UPDATE tabela_login SET senha = ? where aluno_id = ?",
      [senha, req.params.aluno_id]
    );
    res.json({ mensagem: "senha atualizada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};