import express from "express";
import { listarTurmas, obterTurma } from "../controllers/turma.controller.js"
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();
router.get("/curso/:id",listarTurmas)
router.get("/:id",obterTurma)


export default router;