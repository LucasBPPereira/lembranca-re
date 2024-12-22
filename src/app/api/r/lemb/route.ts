import { NextResponse } from "next/server";

export interface IRegisterLemb {
  key: number;
  title: string;
  content: string;
  date: Date;
}
// const perm = process.env.POST_PERM_REG;

const mock = [
  {
    key: 3,
    title: "Testando o tres",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus deleniti id quos iure dignissimos voluptatum sit ullam error eligendi autem consectetur doloribus cumque unde voluptas minus perspiciatis explicabo provident.",
    category: "Praia",
    color: "#da1818",
    date: "24/12/20024",
  },
  {
    key: 4,
    title: "Fechou",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus deleniti id quos iure dignissimos voluptatum sit ullam error eligendi autem consectetur doloribus cumque unde voluptas minus perspiciatis explicabo provident.",
    category: "Casa",
    color: "#da1818",
    date: "24/12/20024",
  },
  {
    key: 5,
    title: "Testandoss",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, delectus deleniti id quos iure dignissimos voluptatum sit ullam error eligendi autem consectetur doloribus cumque unde voluptas minus perspiciatis explicabo provident.",
    category: "Restaurante",
    color: "#da1818",
    date: "24/12/20024",
  },
  
];

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
    return NextResponse.json({mock}, { status: 200 });
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
    const { title, content, date } = (await req.json()) as IRegisterLemb;
    // const userRole = req.headers.get("User-Permission");

    // if (userRole !== perm) {
    //   return NextResponse.json(
    //     { message: "Permissão negada!" },
    //     { status: 403 }
    //   );
    // }

    if (!title || !content || !date) {
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

    return NextResponse.json({ message: "Lembrança criada" }, { status: 201 });
  } catch (error) {
    console.error("Erro no processamento da requisição: ", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

