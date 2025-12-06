import express from "express";
import { criarAdmin } from "../controllers/admin.controller.js"

const router = express.Router();

router.post('/', criarAdmin)

export default router;