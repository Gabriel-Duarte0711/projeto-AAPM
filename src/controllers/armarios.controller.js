import { db } from "../config/db.js";

export async function listarArmarios(req, res) {
  try {
    const sql = `
      SELECT 
        a.numero_armario AS armario,
        u.nome AS aluno,
        u.telefone,
        u.email,
        c.nome AS curso
      FROM tabela_usuario u
      JOIN tabela_armario a ON u.armario_id = a.numero_armario
      JOIN tabela_curso c ON u.curso_id = c.id
    `;

    const [rows] = await db.query(sql);
    res.json(rows);

  } catch (error) {
    console.error("Erro ao buscar armarios:", error);
    res.status(500).json({ error: "Erro ao buscar os armários" });
  }
}
