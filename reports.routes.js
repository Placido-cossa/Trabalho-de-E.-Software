const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reports.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/rbac.middleware");

router.get(
  "/status-summary",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["REPORTS.VIEW"]),
  reportsController.statusSummary
);

module.exports = router;