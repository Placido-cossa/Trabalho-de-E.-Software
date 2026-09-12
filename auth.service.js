const prisma = require("../db");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/token");
const { z } = require("zod");

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

async function registerUser({ username, password, roleId }) {
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
      userRoles: { create: { roleId } }
    }
  });

  return user;
}

async function login({ username, password }, jwtSecret, jwtExpiresIn) {
  const data = loginSchema.parse({ username, password });

  const user = await prisma.user.findUnique({
    where: { username },
    include: { userRoles: { include: { role: true } } }
  });

  if (!user || !user.isActive) {
    return null;
  }

  const ok = await comparePassword(data.password, user.passwordHash);
  if (!ok) return null;

  return {
    userId: user.id,
    username: user.username,
    roles: user.userRoles.map(ur => ur.role.name)
  };
}

function issueToken({ userId, username, roles }, jwtSecret, jwtExpiresIn) {
  return signToken({ sub: userId, username, roles }, jwtSecret, jwtExpiresIn);
}

module.exports = { registerUser, login, issueToken };