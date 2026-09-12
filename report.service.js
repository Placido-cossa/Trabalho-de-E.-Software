const prisma = require("../db");

async function statusCounts() {
  const all = await prisma.expediente.findMany({ select: { status: true } });
  const counts = {};
  for (const e of all) {
    counts[e.status] = (counts[e.status] || 0) + 1;
  }
  return counts;
}

async function recentAudits(limit = 50) {
  return prisma.audit.findMany({
    orderBy: { createdAt: "desc" },
    take: limit
  });
}

module.exports = { statusCounts, recentAudits };