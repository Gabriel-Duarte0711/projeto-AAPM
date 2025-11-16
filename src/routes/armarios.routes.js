import express from "express";
import { listarArmariosG, listarArmariosL } from "../controllers/armarios.controller.js";

const router = express.Router();

router.get("/", listarArmariosG);
router.get("/obterUsuario", listarArmariosL);

export default router;
