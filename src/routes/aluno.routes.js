import express from "express";
import { criarAluno, listarAlunos } from "../controllers/aluno.controller.js"

const router = express.Router();
router.get("/", listarAlunos)
router.post("/", criarAluno)


export default router;