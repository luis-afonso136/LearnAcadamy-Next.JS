import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function registerRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const { nome, email, password, tipoUtilizador } = request.body as {
      nome: string;
      email: string;
      password: string;
      tipoUtilizador: string;
    };

    if (!nome || !email || !password) {
      return reply.status(400).send({ error: "Dados inválidos!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { nome, email, password: hashedPassword, tipoUtilizador },
    });

    reply.send({ id: user.id, email: user.email });
  });
}
