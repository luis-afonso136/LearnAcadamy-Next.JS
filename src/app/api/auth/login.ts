import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function loginRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({ error: "Credenciais inválidas!" });
    }

    const token = jwt.sign(
      { id: user.id, tipoUtilizador: user.tipoUtilizador },
      process.env.JWT_SECRET || "secreta",
      { expiresIn: "1h" }
    );

    reply.send({ token, user: { id: user.id, nome: user.nome, email: user.email } });
  });
}
