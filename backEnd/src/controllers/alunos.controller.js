
import { db } from "../config/db.js"

import bcrypt from "bcrypt"
// ============================
//  Rotas CRUD
// ============================


export async function criarUsuario(req, res) {
  try {
    const { CPF, nome, matricula, telefone, email, curso_id, turma_id, armario_id, pagamento } = req.body;
    if (!CPF || !nome || !matricula || !telefone || !email || !curso_id || !turma_id || !armario_id || !pagamento)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    const hashedPassword = await bcrypt.hash(CPF, 10)

    const [usuario] = await db.execute(
      "INSERT INTO tabela_usuario (senha) VALUES ( ?)",
      [hashedPassword]
    )
    const id_usuario = usuario.insertId;

    const [resultado] = await db.execute(
      "INSERT INTO tabela_alunos (CPF, nome, matricula, telefone, email, curso_id, turma_id, armario_id, pagamento, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [CPF, nome, matricula, telefone, email, curso_id, turma_id, armario_id, pagamento, id_usuario],
    );




    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR ALUNO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function recadastrarUsuario(req, res) {
  try {
    const userId = req.params.id;
    const { armario_id } = req.body;

    const [user] = await db.execute("SELECT * FROM tabela_alunos WHERE id_usuario = ?", [userId]);
    if (user.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    await db.execute(
      "UPDATE tabela_alunos SET is_ativo = ?, armario_id = ? WHERE id_usuario = ?",
      [1, armario_id, userId]
    );


    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function listarUsuario(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_alunos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterUsuario(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_alunos WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterUsuarioPorCPF(req, res) {
  try {
    const { CPF } = req.body;
    
    if (!CPF) {
      return res.status(400).json({ erro: "CPF é obrigatório." });
    }

    const [rows] = await db.execute(
      "SELECT * FROM tabela_alunos WHERE CPF = ?",
      [CPF]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.json(rows[0]);

  } catch (err) {
    console.error("Erro ao buscar usuário por CPF:", err);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

export async function deletarUsuario(req, res) {
  try {
    const userId = req.params.id;

    const [user] = await db.execute("SELECT * FROM tabela_alunos WHERE id_usuario = ?", [userId]);
    if (user.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    await db.execute(
      "UPDATE tabela_alunos SET is_ativo = ? WHERE id_usuario = ?",
      [0, userId]
    );


    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterUsuarioPorArmario(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM tabela_alunos WHERE armario_id = ?", [
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

    // Buscar aluno pelo ID
    const [userRows] = await db.execute("SELECT * FROM tabela_alunos WHERE id = ?", [userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const usuario = userRows[0];

    // Atualizar dados do aluno
    await db.execute(
      `UPDATE tabela_alunos 
       SET nome = ?, CPF = ?, matricula = ?, telefone = ?, email = ?, 
           curso_id = ?, turma_id = ?, pagamento = ?
       WHERE id = ?`,
      [nome, CPF, matricula, telefone, email, curso_id, turma_id, pagamento, userId]
    );

    // Se o CPF mudou, atualizar a senha na tabela_usuario
    if (CPF !== usuario.CPF && usuario.id_usuario) {
      const hashedPassword = await bcrypt.hash(CPF, 10);

      await db.execute(
        "UPDATE tabela_usuario SET senha = ? WHERE id = ?",
        [hashedPassword, usuario.id_usuario] // AGORA ESTÁ CORRETO
      );
    }

    res.json({ mensagem: "Usuário atualizado com sucesso!" });

  } catch (err) {
    console.error("ERRO AO ATUALIZAR USUÁRIO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function atualizarArmarioUsuario(req, res) {
  try {
    const userId = req.params.id;
    const { armario_id } = req.body;

    const [user] = await db.execute("SELECT * FROM tabela_alunos WHERE id_usuario = ?", [userId]);
    if (user.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    await db.execute(
      "UPDATE tabela_alunos SET armario_id = ? WHERE id_usuario = ?",
      [ armario_id, userId]
    );
    await db.execute(
      "UPDATE tabela_armario SET estado = ? WHERE numero_armario = ?",
      ["O", armario_id]
    )

    res.json({ mensagem: "Usuário realocado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarDataEncerramento = async (req, res) => {
  const { data_encerramento } = req.body;

  if (!data_encerramento) {
    return res.status(400).json({ erro: 'Data não fornecida' });
  }

  try {
    // ✅ Trocar 'pool' por 'db'
    const [resultado] = await db.execute(
      'UPDATE tabela_alunos SET data_encerramento = ?',
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