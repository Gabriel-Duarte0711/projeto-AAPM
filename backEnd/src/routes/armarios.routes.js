import express from "express";
import { listarArmariosG, listarArmariosL, atualizarEstado } from "../controllers/armarios.controller.js";
import { autenticarToken } from "file:///C:/Users/biel1/OneDrive/Area%20de%20Trabalho/projeto-AAPM/backend/src/middleware/auth.middleware.js";
const router = express.Router();

router.get("/",autenticarToken, listarArmariosG);
router.get("/obterUsuario",autenticarToken, listarArmariosL);
router.put("/:numero_armario",autenticarToken, atualizarEstado)


export default router;
