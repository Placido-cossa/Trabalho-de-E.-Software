const reportService = require("../services/report.service");
const prisma = require("../db");

async function listAudit(req, res) {
  const audits = await prisma.audit.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  res.json({ audits });
}

module.exports = { listAudit };