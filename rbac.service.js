const prisma = require("../db");

async function getUserPermissionsByRoleNames(roleNames) {
  if (!roleNames || roleNames.length === 0) return [];

  const perms = await prisma.rolePermission.findMany({
    where: { role: { name: { in: roleNames } } },
    include: { permission: true }
  });

  return [...new Set(perms.map(p => p.permission.cod))];
}

async function hasPermission(codes, required) {
  const set = new Set(codes);
  return required.every(r => set.has(r));
}

module.exports = { getUserPermissionsByRoleNames, hasPermission };