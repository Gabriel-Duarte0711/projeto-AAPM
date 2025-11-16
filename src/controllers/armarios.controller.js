import { db } from "../config/db.js";

export async function listarArmariosL(req, res) {
  try {
    const sql = `
      SELECT 
        a.numero_armario,
        u.nome,
        u.telefone,
        u.email,
        c.nome AS curso,
        t.turma
      FROM tabela_usuario u
      JOIN tabela_armario a ON u.armario_id = a.numero_armario
      JOIN tabela_curso c ON u.curso_id = c.id
      JOIN tabela_turma t ON c.id = t.curso_id
    `;

    const [rows] = await db.query(sql);
    res.json(rows);

  } catch (error) {
    console.error("Erro ao buscar armarios:", error);
    res.status(500).json({ error: "Erro ao buscar os armários" });
  }
}


export async function listarArmariosG(req, res) {
  try {
    const sql = `
      SELECT * from tabela_armario
    `;

    const [rows] = await db.query(sql);
    res.json(rows);

  } catch (error) {
    console.error("Erro ao buscar armarios:", error);
    res.status(500).json({ error: "Erro ao buscar os armários" });
  }
}
