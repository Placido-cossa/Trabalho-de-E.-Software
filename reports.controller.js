const reportService = require("../services/report.service");

async function statusSummary(req, res) {
  const counts = await reportService.statusCounts();
  res.json({ statusCounts: counts });
}

module.exports = { statusSummary };