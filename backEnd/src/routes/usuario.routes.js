import express from "express";
import {
    criarUsuario,
    listarUsuario,
    obterUsuario,
    atualizarUsuario,
    atualizarDataEncerramento,
    deletarUsuario
} from "../controllers/usuario.controller.js"
const router = express.Router();

// router.get("/me", autenticarToken, (req, res) => {
//     res.json({
//         mensagem: "Acesso permitido",
//         usuario: req.usuario
//     });
// });

router.get("/", listarUsuario)
router.post("/", criarUsuario)
router.get("/:id", obterUsuario)
router.put("/:id", atualizarUsuario)
router.put("/data", atualizarDataEncerramento)
router.delete("/:id", deletarUsuario)

export default router;