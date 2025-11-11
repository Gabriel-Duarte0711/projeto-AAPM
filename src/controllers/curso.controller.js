
import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================


export async function listarCursos(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM curso");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};