import express from "express";
import { listarTurmas, obterTurma } from "../controllers/turma.controller.js"
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();
router.get("/curso/:id", autenticarToken,listarTurmas)
router.get("/:id", autenticarToken,obterTurma)


export default router;