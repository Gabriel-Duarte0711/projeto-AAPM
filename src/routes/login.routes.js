import express from "express";
import { listarLogin, atualizarSenha, obterLogin } from "../controllers/login.controller.js"

const router = express.Router();
router.get("/", listarLogin)
router.get("/:aluno_id", obterLogin)
router.put("/:aluno_id", atualizarSenha)


export default router;