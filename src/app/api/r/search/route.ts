import { NextResponse, type NextRequest } from "next/server";

const dados = [
  {
    title: "Teste",
    content:
      "Aqui é ok ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Titulo",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-16",
  },
  {
    title: "Curtindo a formatura",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda rem voluptates vero maiores hic, laudantium, quia quisquam, ullam ratione odio aut. Placeat blanditiis quibusdam dolorem nostrum, nisi eveniet totam!",
    date: "2024-12-15",
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryTitle = searchParams.get("title");
  const queryDate = searchParams.get("date");

  if (queryDate && queryTitle) {
    const query = dados.filter((post) => post.title === queryTitle);
    const exist = query.filter((post) => post.date === queryDate);
    
    if (exist.length < 1) {
        return NextResponse.json(
            { message: "Não foi possível encontrar!" },
            { status: 404 }
          );
    }
  
    if (exist.length > 0) {
        return NextResponse.json({exist}, {status: 200});
    }
  }
  
  if (queryTitle) {
    const dataTitle = dados.filter((post) => post.title === queryTitle);

    if (dataTitle?.length < 1) {
        return NextResponse.json(
            { message: "Não foi possível encontrar!" },
        { status: 404 }
      );
    }

    if (dataTitle.length > 0) {
      return NextResponse.json({ dataTitle }, { status: 200 });
    }
  }

  if (queryDate) {
    const dataDate = dados.filter((post) => post.date === queryDate);

    if (dataDate?.length < 1) {
      return NextResponse.json(
        { message: "Não foi possível encontrar!" },
        { status: 404 }
      );
    }

    if (dataDate.length > 0) {
      return NextResponse.json({ dataDate }, { status: 200 });
    }
  }


  return NextResponse.json({message: "Error"}, {status: 500})
}
