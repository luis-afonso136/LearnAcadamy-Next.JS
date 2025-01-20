import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, image } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ message: 'Nome e Email são obrigatórios.' }, { status: 400 });
    }

    // Atualizar o utilizador no banco de dados
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json({ message: 'Perfil atualizado com sucesso!', user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao atualizar o perfil.' }, { status: 500 });
  }
}
