import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar usuários.', error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, role } = await req.json();

    if (!name || !email || !role) {
      return NextResponse.json({ message: 'Nome, email e role são obrigatórios.' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: { name, email, role, emailVerified: false, createdAt: new Date(), updatedAt: new Date() },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao criar usuário.', error }, { status: 500 });
  }
}
