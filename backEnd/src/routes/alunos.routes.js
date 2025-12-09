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

// ROTAS ESPECÍFICAS – DEVEM VIR PRIMEIRO
router.post("/cpf", obterUsuarioPorCPF);
router.put("/recadastrar/:id", recadastrarUsuario);
router.put("/armario/:id", atualizarArmarioUsuario);
router.put("/desativar/:id", deletarUsuario);
router.put("/atualizar-data-encerramento", atualizarDataEncerramento);
router.put("/data", atualizarDataEncerramento);

// ROTAS PADRÃO
router.get("/", listarUsuario);
router.post("/", criarUsuario);

// ROTAS GENÉRICAS – POR ÚLTIMO
router.get("/:id", obterUsuario);
router.put("/:id", atualizarUsuario);


export default router;
