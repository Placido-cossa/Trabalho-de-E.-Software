const { verifyToken } = require("../utils/token");

function requireAuth(jwtSecret) {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || "";
      const [type, token] = header.split(" ");
      if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Token ausente ou inválido" });
      }

      const payload = verifyToken(token, jwtSecret);
      req.auth = { userId: payload.sub, username: payload.username, roles: payload.roles || [] };
      next();
    } catch (e) {
      return res.status(401).json({ message: "Token inválido/expirado" });
    }
  };
}

module.exports = { requireAuth };