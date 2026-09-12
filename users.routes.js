const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { requirePermissions } = require("../middleware/rbac.middleware");

router.get(
  "/",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["USERS.MANAGE"]),
  usersController.listUsers
);

router.post(
  "/",
  requireAuth(process.env.JWT_SECRET),
  requirePermissions(["USERS.MANAGE"]),
  usersController.createUser
);

module.exports = router;