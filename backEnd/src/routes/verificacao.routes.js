import express from "express";
import { criarCodigo, verificarCodigo, atualizarSenha } from "../controllers/verificacao.controller.js"
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();

router.post("/", criarCodigo);
router.post("/verificar", verificarCodigo);
router.put("/senha/:aluno_id", atualizarSenha);


export default router;