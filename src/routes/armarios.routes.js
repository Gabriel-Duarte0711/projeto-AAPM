import express from "express";
import { listarArmarios } from "../controllers/armarios.controller.js";

const router = express.Router();

router.get("/", listarArmarios);

export default router;
