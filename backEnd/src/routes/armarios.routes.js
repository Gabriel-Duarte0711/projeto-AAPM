import express from "express";
import { listarArmariosG, listarArmariosL, atualizarEstado } from "../controllers/armarios.controller.js";
const router = express.Router();

router.get("/",listarArmariosG);
router.get("/obterUsuario",listarArmariosL);
router.put("/:numero_armario", atualizarEstado)


export default router;
