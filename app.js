const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { errorHandler } = require("./middleware/error.middleware");

const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const rolesRoutes = require("./routes/roles.routes");
const expedientesRoutes = require("./routes/expedientes.routes");
const auditRoutes = require("./routes/audit.routes");
const reportsRoutes = require("./routes/reports.routes");

function createApp() {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/roles", rolesRoutes);
  app.use("/api/expedientes", expedientesRoutes);
  app.use("/api/audit", auditRoutes);
  app.use("/api/reports", reportsRoutes);

  app.use(errorHandler);

  return app;
}

module.exports = { createApp };