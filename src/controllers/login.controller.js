
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