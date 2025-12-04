import express from "express";
import { listarLogin, atualizarSenha, obterLogin, login } from "../controllers/login.controller.js"
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();
router.get("/", autenticarToken,listarLogin)
router.get("/:aluno_id", autenticarToken,obterLogin)
router.put("/:aluno_id",autenticarToken, atualizarSenha)
router.post("/", login)


export default router;