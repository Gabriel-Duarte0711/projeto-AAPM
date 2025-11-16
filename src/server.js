// ============================
//  Dependências
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cursoRoute from "./routes/curso.routes.js"
import alunoRoute from "./routes/usuario.routes.js"
import turmaRoute from "./routes/turma.routes.js"
import loginRoute from "./routes/login.routes.js"
import armariosRoutes from "./routes/armarios.routes.js";



// ============================
//  Configuração do servidor
// ============================
const app = express()
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("API rodando com sucesso")
})

app.use("/curso", cursoRoute)
app.use("/usuario", alunoRoute)
app.use("/turma", turmaRoute)
app.use("/login", loginRoute)
app.use("/armarios", armariosRoutes);

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
