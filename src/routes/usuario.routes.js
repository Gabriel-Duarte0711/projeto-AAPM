import express from "express";
import { criarUsuario, listarUsuario, obterUsuario, atualizarDataEncerramento    } from "../controllers/usuario.controller.js"

const router = express.Router();
router.get("/", listarUsuario)
router.post("/", criarUsuario)
router.get("/:id", obterUsuario)
router.put("/", atualizarDataEncerramento)



export default router;