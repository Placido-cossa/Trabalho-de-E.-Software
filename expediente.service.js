const prisma = require("../db");

async function createExpediente({ numero, assunto }) {
  return prisma.expediente.create({
    data: { numero, assunto }
  });
}

async function listExpedientes() {
  return prisma.expediente.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      movements: { orderBy: { createdAt: "desc" } }
    }
  });
}

async function updateStatus({ expedienteId, nextStatus, movement }) {
  const expediente = await prisma.expediente.findUnique({
    where: { id: expedienteId }
  });
  if (!expediente) return null;

  const updated = await prisma.expediente.update({
    where: { id: expedienteId },
    data: { status: nextStatus }
  });

  await prisma.expedienteMovement.create({
    data: {
      expedienteId,
      action: movement.action,
      fromStatus: expediente.status,
      toStatus: nextStatus,
      comment: movement.comment || null
    }
  });

  return updated;
}

async function archive({ expedienteId, comment }) {
  return updateStatus({
    expedienteId,
    nextStatus: "ARQUIVO",
    movement: { action: "ARQUIVAR", comment }
  });
}

module.exports = { createExpediente, listExpedientes, updateStatus, archive };