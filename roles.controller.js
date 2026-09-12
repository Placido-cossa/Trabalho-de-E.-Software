const prisma = require("../db");

async function listRoles(req, res) {
  const roles = await prisma.role.findMany({
    include: { rolePermissions: { include: { permission: true } } }
  });

  res.json({
    roles: roles.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      permissions: r.rolePermissions.map(rp => rp.permission.cod)
    }))
  });
}

module.exports = { listRoles };