import { db } from "../config/db.js";

export async function listarUsuarioArmario(req, res) {
  try {
    const sql = `
      SELECT 
	tra.*,
	ta.*,
	tc.nome AS curso,
	tt.turma
FROM tabela_reserva_armario tra
JOIN tabela_alunos ta ON tra.id_aluno = ta.id
JOIN tabela_curso tc ON ta.curso_id = tc.id
JOIN tabela_turma tt ON ta.turma_id = tt.id
WHERE tra.is_ativo = 1
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
    const { estado } = req.body;
    await db.execute(
      "UPDATE tabela_armario SET estado = ? where numero_armario = ?",
      [estado, req.params.numero_armario]
    );
    res.json({ mensagem: "Armario atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
