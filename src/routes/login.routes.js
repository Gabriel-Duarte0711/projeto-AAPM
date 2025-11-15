import express from "express";
import { listarLogin } from "../controllers/login.controller.js"

const router = express.Router();
router.get("/", listarLogin)


export default router;