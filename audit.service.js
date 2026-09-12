const prisma = require("../db");

async function writeAudit({ actorUserId, entityType, entityId, action, meta }) {
  await prisma.audit.create({
    data: {
      actorUserId: actorUserId || null,
      entityType,
      entityId,
      action,
      meta: meta ? JSON.stringify(meta) : null
    }
  });
}

module.exports = { writeAudit };