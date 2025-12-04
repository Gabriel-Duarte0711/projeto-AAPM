// ============================
//  Dependências
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import cursoRoute from "./routes/curso.routes.js"
import alunoRoute from "./routes/usuario.routes.js"
import turmaRoute from "./routes/turma.routes.js"
import loginRoute from "./routes/login.routes.js"
import armariosRoutes from "./routes/armarios.routes.js";

import "dotenv/config";
// ============================
//  Configuração do servidor
// ============================
const app = express()
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
}));
app.use(bodyParser.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("API rodando com sucesso")
})

app.use("/curso", cursoRoute)
app.use("/usuario", alunoRoute)
app.use("/turma", turmaRoute)
app.use("/login", loginRoute)
app.use("/armarios", armariosRoutes);
console.log("JWT:", process.env.JWT_SECRET);
// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));