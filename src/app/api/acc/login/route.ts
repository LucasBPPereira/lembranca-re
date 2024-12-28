import { PrismaGetInstance } from "@/lib/prisma-pg";
import { GenerateSession } from "@/utils/generate-session";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

interface ILoginBody {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as ILoginBody;

  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const prisma = PrismaGetInstance();

    const validEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (!validEmail) {
      return NextResponse.json({ message: "Erro: C001" }, { status: 400 });
    }

    const pass = validEmail.password;

    const validPassword = await bcrypt.compare(password, pass);

    if (!validPassword) {
      return NextResponse.json({ message: "Erro: C004" }, { status: 400 });
    }

    const hash = bcrypt.hashSync(password, 5);

    const session = GenerateSession({
      email,
      passwordHash: hash,
    });

    cookies().set({
      name: "session",
      value: `${session}`,
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 1,
    });    

    return NextResponse.json({ message: "Login feito!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
