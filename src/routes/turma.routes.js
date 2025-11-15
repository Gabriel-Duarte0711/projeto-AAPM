import express from "express";
import { listarTurmas } from "../controllers/turma.controller.js"

const router = express.Router();
router.get("/:id", listarTurmas)


export default router;