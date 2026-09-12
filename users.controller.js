const prisma = require("../db");
const { hashPassword } = require("../utils/password");

async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    include: { userRoles: { include: { role: true } } }
  });

  res.json({
    users: users.map(u => ({
      id: u.id,
      username: u.username,
      isActive: u.isActive,
      roles: u.userRoles.map(ur => ur.role.name)
    }))
  });
}

async function createUser(req, res) {
  const { username, password, roleId } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash: await hashPassword(password),
      userRoles: { create: { roleId } }
    }
  });

  res.status(201).json({ id: user.id, username: user.username });
}

module.exports = { listUsers, createUser };