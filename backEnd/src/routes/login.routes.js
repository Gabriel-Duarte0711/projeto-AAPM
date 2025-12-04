import express from "express";
import { listarLogin, atualizarSenha, obterLogin, login } from "../controllers/login.controller.js"
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();
router.get("/",listarLogin)
router.get("/:aluno_id",obterLogin)
router.put("/:aluno_id", atualizarSenha)
router.post("/", login)


export default router;