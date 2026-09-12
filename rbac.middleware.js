const { getUserPermissionsByRoleNames, hasPermission } = require("../services/rbac.service");

function requirePermissions(requiredCodes) {
  return async (req, res, next) => {
    const jwtRoles = req.auth?.roles || [];
    const userPerms = await getUserPermissionsByRoleNames(jwtRoles);

    const ok = await hasPermission(userPerms, requiredCodes);
    if (!ok) {
      return res.status(403).json({ message: "Acesso negado (RBAC)" });
    }
    req.userPermissions = userPerms;
    next();
  };
}

module.exports = { requirePermissions };