import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: any;
  }
}
import jwt from "jsonwebtoken";

export async function verifyToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ error: "Token não fornecido!" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreta");

    request.user = decoded; // Salvamos as informações no request para uso futuro
  } catch (err) {
    return reply.status(401).send({ error: "Token inválido!" });
  }
}
