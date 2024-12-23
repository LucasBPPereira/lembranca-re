import { PrismaGetInstance } from "@/lib/prisma-pg";
import { NextResponse } from "next/server";

export interface IRegisterLemb {
  key: number;
  title: string;
  content: string;
  category: string;
  color: string;
  date: Date;
}

function validDate(value: string | Date): boolean {
  // Se já for um objeto Date, verificamos se é válido
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  // Caso contrário, tentamos criar uma nova data a partir do string
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export async function GET() {
  try {    
    const prisma = PrismaGetInstance();
    const dados = await prisma.lembranca.findMany();
    return NextResponse.json({dados}, { status: 200 });
  } catch (error) {
    console.error("Erro na busca das lembranças: ", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, color, category, date  } = (await req.json()) as IRegisterLemb;

    if (!title || !content || !color || !category || !date) {
      return NextResponse.json(
        { message: "Campos inválidos" },
        { status: 400 }
      );
    }

    if (!validDate(date)) {
      return NextResponse.json(
        {
          message: `A data está errada: ${date}`,
        },
        { status: 400 }
      );
    }

    if (content.length < 20) {
      return NextResponse.json(
        { message: "O conteúdo deve ser maior do que 50 caracteres." },
        { status: 400 }
      );
    }

    if (title.length < 5) {
      return NextResponse.json(
        { message: "O título deve ter mais de 5 caracteres." },
        { status: 400 }
      );
    }

    const prisma = PrismaGetInstance();
    const lembranca = await prisma.lembranca.create({
      data: {
        title,
        content,
        category,
        color,
        date
      }
    })

    return NextResponse.json({ lembranca }, { status: 201 });
  } catch (error) {
    console.error("Erro no processamento da requisição: ", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

