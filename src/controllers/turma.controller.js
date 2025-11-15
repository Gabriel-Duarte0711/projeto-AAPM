import { db } from "../config/db.js";

export async function listarTurmas(req, res) {
  try {
    const curso_id = req.params.id;

    if (!curso_id) {
      return res.status(400).json({ erro: "ID do curso não informado" });
    }

    const [rows] = await db.execute(
      "SELECT * FROM tabela_turma WHERE curso_id = ?",
      [curso_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Nenhuma turma encontrada para este curso" });
    }

    res.json(rows);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
