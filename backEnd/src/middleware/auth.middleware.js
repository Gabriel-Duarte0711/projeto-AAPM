import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ erro: "Token não enviado" });

    try {
        
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario; // salva dados do token
        next();
    } catch {
        return res.status(403).json({ erro: "Token inválido ou expirado" });
    }
}
