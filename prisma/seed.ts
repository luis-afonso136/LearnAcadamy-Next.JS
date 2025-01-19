import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10); // Substitua por uma senha segura
  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@admin.com",
      password: hashedPassword,
      tipoUtilizador: "Administrador",
    },
  });

  console.log("Administrador criado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
