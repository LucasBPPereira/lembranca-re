import { NextResponse } from "next/server";

export interface IRegisterLemb {
  title: string;
  content: string;
  date: Date;
}
// const perm = process.env.POST_PERM_REG;

const dados = [
  {
    title: "Teste de título",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Teste de título",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Teste de título",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Teste de título",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Teste de título",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Teste de título",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Teste de título",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
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

