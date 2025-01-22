import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, email, role } = await req.json();

    if (!name || !email || !role) {
      return NextResponse.json({ message: 'Nome, email e role são obrigatórios.' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role, updatedAt: new Date() },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar usuário.', error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Usuário deletado com sucesso.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao deletar usuário.', error }, { status: 500 });
  }
}
