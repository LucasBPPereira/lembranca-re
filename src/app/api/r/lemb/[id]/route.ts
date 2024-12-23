import { PrismaGetInstance } from "@/lib/prisma-pg";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, content } = await req.json();
    const prisma = PrismaGetInstance();
    const lembranca = await prisma.lembranca.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({ lembranca }, { status: 200 });
  } catch (erro) {
    console.log(erro);
    return NextResponse.json({ message: "Não foi possível" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const prisma = PrismaGetInstance();
    await prisma.lembranca.delete({ where: { id } });

    return NextResponse.json(
      { message: "Lembrança com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro ao deletar a lembrança", err);
    return NextResponse.json(
      { error: "Erro ao deletar a lembrança" },
      { status: 500 }
    );
  }
}
