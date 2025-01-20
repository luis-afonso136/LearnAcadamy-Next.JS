import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { auth } from '../../../lib/auth';

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const userId = session.user.id;
  const { name, email, image } = await req.json();

  if (!name || !email) {
    return NextResponse.json(
      { message: 'Nome e email são obrigatórios' },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, image },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar o perfil', error },
      { status: 500 }
    );
  }
}
