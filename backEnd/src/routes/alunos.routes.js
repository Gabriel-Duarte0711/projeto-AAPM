import express from "express";
import {
    criarUsuario,
    listarUsuario,
    obterUsuario,
    atualizarUsuario,
    deletarUsuario,
    atualizarDataEncerramento
} from "../controllers/alunos.controller.js"
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get("/me", autenticarToken, (req, res) => {
    res.json({
        mensagem: "Acesso permitido",
        usuario: req.usuario
    });
});

router.put('/atualizar-data-encerramento', atualizarDataEncerramento)
router.get("/", listarUsuario)
router.post("/", criarUsuario)
router.get("/:id", obterUsuario)
router.put("/:id",atualizarUsuario)
router.put("/data", atualizarDataEncerramento)
router.put("/desativar/:id", deletarUsuario)


export default router;