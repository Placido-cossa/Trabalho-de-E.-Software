const express = require("express");
const router = express.Router();
const auditController = require("../controllers/audit.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/rbac.middleware");

router.get(
  "/",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["AUDIT.VIEW"]),
  auditController.listAudit
);

module.exports = router;