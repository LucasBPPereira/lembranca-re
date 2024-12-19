import { type NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, content } = await req.json();

    console.log(id, title, content);

    return NextResponse.json({ message: "Alterado" }, { status: 200 });
  } catch (erro) {
    console.log(erro);
    return NextResponse.json({ message: "Não foi possível" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  console.log(id);

  return NextResponse.json(
    { message: "Deletado com sucesso" },
    { status: 200 }
  );
}
