import express from "express";
import {
    criarUsuario,
    recadastrarUsuario,
    listarUsuario,
    obterUsuario,
    obterUsuarioPorCPF,
    atualizarUsuario,
    atualizarArmarioUsuario,
    deletarUsuario,
    atualizarDataEncerramento
} from "../controllers/alunos.controller.js";

import { autenticarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Rotas específicas
router.get("/me", autenticarToken, (req, res) => {
    res.json({
        mensagem: "Acesso permitido",
        usuario: req.usuario
    });
});

router.put("/atualizar-data-encerramento", atualizarDataEncerramento);
router.post("/cpf", obterUsuarioPorCPF);
router.put("/recadastrar/:id", recadastrarUsuario);
router.put("/armario/:id", atualizarArmarioUsuario);
router.put("/desativar/:id", deletarUsuario);

// Rotas principais
router.get("/", listarUsuario);
router.post("/", criarUsuario);

// Rota genérica por último
router.get("/:id", obterUsuario);
router.put("/:id", atualizarUsuario);

export default router;
