
import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================


export async function criarUsuario(req, res) {
  try {
    const { nome,  matricula, telefone, email, curso_id, turma_id, armario_id } = req.body;
    if (!nome || !matricula || !telefone || !email || !curso_id || !turma_id || !armario_id)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO tabela_usuario (nome, matricula, telefone, email, curso_id, turma_id, armario_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nome, matricula, telefone, email, curso_id, turma_id, armario_id],

    );

    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR ALUNO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function listarUsuario(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_usuario");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function obterUsuario(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_usuario WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function atualizarDataEncerramento(req, res) {
  try {
    const { data_encerramento } = req.body;
    await db.execute(
      "UPDATE tabela_usuario SET data_encerramento = ?",
      [data_encerramento]
    );
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function deletarUsuario(req, res) {
  try {
    await db.execute("DELETE FROM tabela_usuario WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};  

export async function obterUsuarioPorArmario(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_usuario WHERE armario_id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};