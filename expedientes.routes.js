const express = require("express");
const router = express.Router();
const expedientesController = require("../controllers/expedientes.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/rbac.middleware");

router.post(
  "/",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["EXPEDIENTE.CREATE"]),
  expedientesController.create
);

router.get(
  "/",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["EXPEDIENTE.READ"]),
  expedientesController.list
);

router.put(
  "/status",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["EXPEDIENTE.UPDATE_STATUS"]),
  expedientesController.updateStatus
);

router.post(
  "/archive",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["EXPEDIENTE.ARCHIVE"]),
  expedientesController.archive
);

module.exports = router;