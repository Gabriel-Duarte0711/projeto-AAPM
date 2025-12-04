import express from "express";
import {
    criarUsuario,
    listarUsuario,
    obterUsuario,
    atualizarUsuario,
    deletarUsuario,
    atualizarDataEncerramento
} from "../controllers/usuario.controller.js"
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get("/me", autenticarToken, (req, res) => {
    res.json({
        mensagem: "Acesso permitido",
        usuario: req.usuario
    });
});

router.put('/atualizar-data-encerramento', autenticarToken, atualizarDataEncerramento)
router.get("/", autenticarToken, listarUsuario)
router.post("/", criarUsuario)
router.get("/:id", autenticarToken, obterUsuario)
router.put("/:id", autenticarToken,atualizarUsuario)
router.put("/data", autenticarToken, atualizarDataEncerramento)
router.delete("/:id", autenticarToken,deletarUsuario)


export default router;