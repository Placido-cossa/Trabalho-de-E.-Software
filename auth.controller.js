const prisma = require("../db");
const authService = require("../services/auth.service");

async function login(req, res) {
  const { username, password } = req.body;
  const user = await authService.login(
    { username, password },
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN
  );

  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = authService.issueToken(
    user,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN
  );

  res.json({ token, user: { username: user.username, roles: user.roles } });
}

module.exports = { login };