const expedienteService = require("../services/expediente.service");
const auditService = require("../services/audit.service");

async function create(req, res) {
  const { numero, assunto } = req.body;

  const exp = await expedienteService.createExpediente({ numero, assunto });

  await auditService.writeAudit({
    actorUserId: req.auth.userId,
    entityType: "EXPEDIENTE",
    entityId: exp.id,
    action: "CREATE",
    meta: { numero: exp.numero, assunto: exp.assunto }
  });

  res.status(201).json(exp);
}

async function list(req, res) {
  const list = await expedienteService.listExpedientes();
  res.json({ expedientes: list });
}

async function updateStatus(req, res) {
  const { expedienteId, nextStatus, comment } = req.body;

  const updated = await expedienteService.updateStatus({
    expedienteId,
    nextStatus,
    movement: { action: "UPDATE_STATUS", comment }
  });

  if (!updated) return res.status(404).json({ message: "Expediente não encontrado" });

  await auditService.writeAudit({
    actorUserId: req.auth.userId,
    entityType: "EXPEDIENTE",
    entityId: updated.id,
    action: "UPDATE_STATUS",
    meta: { nextStatus }
  });

  res.json(updated);
}

async function archive(req, res) {
  const { expedienteId, comment } = req.body;

  const updated = await expedienteService.archive({ expedienteId, comment });
  if (!updated) return res.status(404).json({ message: "Expediente não encontrado" });

  await auditService.writeAudit({
    actorUserId: req.auth.userId,
    entityType: "EXPEDIENTE",
    entityId: updated.id,
    action: "ARCHIVE",
    meta: { comment: comment || null }
  });

  res.json(updated);
}

module.exports = { create, list, updateStatus, archive };