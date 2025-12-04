import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization']
    
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não enviado" });
    }

    // Formato esperado: "Bearer TOKEN_AQUI"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ erro: "Token inválido" });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario; // salva dados do token
        next();
    } catch (erro) {
        return res.status(403).json({ erro: "Token inválido ou expirado" });
    }
}
