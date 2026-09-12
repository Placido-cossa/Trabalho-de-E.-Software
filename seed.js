const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Permissões
  const permissions = [
    { cod: "EXPEDIENTE.CREATE", label: "Criar expediente" },
    { cod: "EXPEDIENTE.READ", label: "Listar/ler expedientes" },
    { cod: "EXPEDIENTE.UPDATE_STATUS", label: "Atualizar status de expediente" },
    { cod: "EXPEDIENTE.ARCHIVE", label: "Arquivar expediente" },
    { cod: "USERS.MANAGE", label: "Gerenciar utilizadores" },
    { cod: "ROLES.MANAGE", label: "Gerenciar papéis" },
    { cod: "REPORTS.VIEW", label: "Ver relatórios" },
    { cod: "AUDIT.VIEW", label: "Ver auditoria" }
  ];

  for (const p of permissions) {
    await prisma.permission.upsert({
      where: { cod: p.cod },
      update: {},
      create: p
    });
  }

  // Papéis
  const roles = [
    { name: "ADMIN", description: "Admin do sistema" },
    { name: "CHEFE_ATENDIMENTO", description: "Define entrada e tramitação inicial" },
    { name: "RESPONSAVEL_TRAMITACAO", description: "Tramita e encaminha" },
    { name: "DESPACHANTE", description: "Despacha e envia para arquivo" },
    { name: "LEITOR", description: "Apenas consulta" }
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r
    });
  }

  const allPerms = await prisma.permission.findMany();
  const permByCod = Object.fromEntries(allPerms.map(p => [p.cod, p]));

  // Mapeamento papel -> permissões
  const rolePerms = {
    ADMIN: [
      "EXPEDIENTE.CREATE",
      "EXPEDIENTE.READ",
      "EXPEDIENTE.UPDATE_STATUS",
      "EXPEDIENTE.ARCHIVE",
      "USERS.MANAGE",
      "ROLES.MANAGE",
      "REPORTS.VIEW",
      "AUDIT.VIEW"
    ],
    CHEFE_ATENDIMENTO: ["EXPEDIENTE.CREATE", "EXPEDIENTE.READ", "EXPEDIENTE.UPDATE_STATUS"],
    RESPONSAVEL_TRAMITACAO: ["EXPEDIENTE.READ", "EXPEDIENTE.UPDATE_STATUS"],
    DESPACHANTE: ["EXPEDIENTE.READ", "EXPEDIENTE.UPDATE_STATUS", "EXPEDIENTE.ARCHIVE"],
    LEITOR: ["EXPEDIENTE.READ", "REPORTS.VIEW"]
  };

  const roleRecords = await prisma.role.findMany();
  const roleByName = Object.fromEntries(roleRecords.map(r => [r.name, r]));

  for (const [roleName, permCods] of Object.entries(rolePerms)) {
    const role = roleByName[roleName];
    for (const cod of permCods) {
      await prisma.rolePermission.upsert({
        where: { id: "dummy" }, // não existe; vamos criar com find+create abaixo
        update: {},
        create: {
          roleId: role.id,
          permissionId: permByCod[cod].id
        }
      }).catch(async () => {
        // fallback: evita falha do upsert fake
        const exists = await prisma.rolePermission.findFirst({
          where: { roleId: role.id, permissionId: permByCod[cod].id }
        });
        if (!exists) {
          await prisma.rolePermission.create({
            data: { roleId: role.id, permissionId: permByCod[cod].id }
          });
        }
      });
    }
  }

  console.log("Seed: permissões e papéis criados.");

  // Usuários iniciais (senha padrão: admin123 / chef123 / leitor123)
  const bcrypt = require("bcryptjs");
  const users = [
    { username: "admin", password: "admin123", role: "ADMIN" },
    { username: "chefe", password: "chef123", role: "CHEFE_ATENDIMENTO" },
    { username: "tramitador", password: "tram123", role: "RESPONSAVEL_TRAMITACAO" },
    { username: "despachante", password: "desp123", role: "DESPACHANTE" },
    { username: "leitor", password: "leitor123", role: "LEITOR" }
  ];

  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);

    const user = await prisma.user.upsert({
      where: { username: u.username },
      update: { passwordHash: hash, isActive: true },
      create: { username: u.username, passwordHash: hash, isActive: true }
    });

    const role = roleByName[u.role];
    const existing = await prisma.userRole.findFirst({
      where: { userId: user.id, roleId: role.id }
    });
    if (!existing) {
      await prisma.userRole.create({ data: { userId: user.id, roleId: role.id } });
    }
  }

  console.log("Seed: usuários iniciais criados.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });