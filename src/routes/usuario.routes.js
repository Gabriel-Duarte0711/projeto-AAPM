import express from "express";
import { criarUsuario, listarUsuario, obterUsuario, atualizarDataEncerramento, deletarUsuario} from "../controllers/usuario.controller.js"

const router = express.Router();
router.get("/", listarUsuario)
router.post("/", criarUsuario)
router.get("/:id", obterUsuario)
router.put("/", atualizarDataEncerramento)
router.delete("/:id", deletarUsuario)
//router.get("/:armario_id", obterUsuarioPorArmario)



export default router;