
import { db } from "../config/db.js"

import bcrypt from "bcrypt"
// ============================
//  Rotas CRUD
// ============================


export async function criarUsuario(req, res) {
  try {
    const { nome, CPF,matricula, telefone, email, curso_id, turma_id, armario_id, pagamento } = req.body;
    if (!nome || !CPF || !matricula || !telefone || !email || !curso_id || !turma_id || !armario_id || !pagamento)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    const [resultado] = await db.execute(
      "INSERT INTO tabela_usuario (nome, CPF, matricula, telefone, email, curso_id, turma_id, armario_id, pagamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nome, CPF,matricula, telefone, email, curso_id, turma_id, armario_id, pagamento],

    );
    const aluno_id = resultado.insertId;
    const hashedPassword = await bcrypt.hash(CPF, 10)

    await db.execute(
      "INSERT INTO tabela_login (aluno_id, senha) VALUES (?, ?)",
      [aluno_id, hashedPassword]
    )

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

export async function deletarUsuario(req, res) {
  try {
    const userId = req.params.id;

    await db.execute("DELETE FROM tabela_login WHERE aluno_id = ?", [userId]);
    await db.execute("DELETE FROM tabela_usuario WHERE id = ?", [userId]);
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

export async function atualizarUsuario(req, res) {
  try {
    const userId = req.params.id;
    const { nome, CPF, matricula, telefone, email, curso_id, turma_id, pagamento } = req.body;

    // Validar se o usuário existe
    const [user] = await db.execute("SELECT * FROM tabela_usuario WHERE id = ?", [userId]);
    if (user.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // Atualizar o usuário
    await db.execute(
      `UPDATE tabela_usuario 
       SET nome = ?, CPF = ?, matricula = ?, telefone = ?, email = ?, 
           curso_id = ?, turma_id = ?, pagamento = ?
       WHERE id = ?`,
      [nome, CPF, matricula, telefone, email, curso_id, turma_id, pagamento, userId]
    );

    // Se o CPF mudou, atualizar a senha também
    if (CPF !== user[0].CPF) {
      const hashedPassword = await bcrypt.hash(CPF, 10);
      await db.execute(
        "UPDATE tabela_login SET senha = ? WHERE aluno_id = ?",
        [hashedPassword, userId]
      );
    }

    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    console.error("ERRO AO ATUALIZAR USUÁRIO:", err);
    res.status(500).json({ erro: err.message });
  }
}
export const atualizarDataEncerramento = async (req, res) => {
    const { data_encerramento } = req.body;
    
    if (!data_encerramento) {
        return res.status(400).json({ erro: 'Data não fornecida' });
    }
    
    try {
        // ✅ Trocar 'pool' por 'db'
        const [resultado] = await db.execute(
            'UPDATE tabela_usuario SET data_encerramento = ?', 
            [data_encerramento]
        );
        
        res.json({ 
            sucesso: true, 
            mensagem: `Aluno(s) atualizado(s)` 
        });
    } catch (error) {
        console.error('Erro ao atualizar data:', error);
        res.status(500).json({ erro: 'Erro ao atualizar dados' });
    }
};