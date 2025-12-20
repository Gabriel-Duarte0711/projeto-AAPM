import express from "express";
import { listarArmariosG, listarUsuarioArmario, atualizarEstado } from "../controllers/armarios.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get("/", listarArmariosG);
router.get("/obterUsuario", listarUsuarioArmario);
router.put("/:numero_armario", atualizarEstado)


export default router;
