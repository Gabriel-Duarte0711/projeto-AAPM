
import { db } from "../config/db.js"

import bcrypt from "bcrypt"
// ============================
//  Rotas CRUD
// ============================

// ============================


export async function criarAdmin (req, res) {
  try {
    const { nome, email, telefone, CPF} = req.body;
    if (!nome || !email || !telefone || !CPF)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    const hashedPassword = await bcrypt.hash(CPF, 10)

    const [usuario] = await db.execute(
      "INSERT INTO tabela_usuario (senha, perfil) VALUES (?, ?)",
      [hashedPassword, "admin"]
    )
    const id_usuario = usuario.insertId;

    const [resultado] = await db.execute(
      "INSERT INTO tabela_admin (nome, email, telefone, CPF , id_usuario) VALUES (?, ?, ?, ?, ?)",
      [nome, email,  telefone, CPF, id_usuario],
    );
    
    

    
    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR ALUNO:", err);
    res.status(500).json({ erro: err.message });
  }
}