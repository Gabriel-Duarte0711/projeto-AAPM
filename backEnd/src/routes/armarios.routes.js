import express from "express";
import { listarArmariosG, listarArmariosL, atualizarEstado } from "../controllers/armarios.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get("/", autenticarToken, listarArmariosG);
router.get("/obterUsuario", autenticarToken, listarArmariosL);
router.put("/:numero_armario", autenticarToken, atualizarEstado)


export default router;
