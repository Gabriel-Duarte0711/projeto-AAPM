import { db } from "../config/db.js";

export async function listarArmariosL(req, res) {
  try {
    const sql = `
      SELECT 
        a.numero_armario,
        u.nome,
        u.CPF,
        u.matricula,
        u.telefone,
        u.email,
        u.pagamento,
        u.id_usuario,
        c.nome AS curso,
        t.turma,
        u.data_encerramento
      FROM tabela_alunos u
      JOIN tabela_armario a ON u.armario_id = a.numero_armario
      JOIN tabela_curso c ON u.curso_id = c.id
      JOIN tabela_turma t ON u.turma_id = t.id
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


export async function atualizarEstado(req, res) {
  try {
    const { estado} = req.body;
    await db.execute(
      "UPDATE tabela_armario SET estado = ? where numero_armario = ?",
      [estado, req.params.numero_armario]
    );
    res.json({ mensagem: "Armario atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};