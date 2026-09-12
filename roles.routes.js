const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/rbac.middleware");

router.get(
  "/",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["ROLES.MANAGE"]),
  rolesController.listRoles
);

module.exports = router;