import express from "express";
import { listarCursos } from "../controllers/curso.controller.js"

const router = express.Router();
router.get("/", listarCursos)


export default router;