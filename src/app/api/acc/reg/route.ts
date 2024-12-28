import { PrismaGetInstance } from "@/lib/prisma-pg";
import bcrypt from "bcrypt";
import { type NextRequest, NextResponse } from "next/server";

interface Iprops {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const {name, email, password} = await req.json() as Iprops;

    if (!name || !email || !password) {
        return NextResponse.json({message: "Campos faltando"}, {status: 400});
    }

    const hashPass = await bcrypt.hash(password, 5);

    const prisma = PrismaGetInstance();

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashPass
        }
    });
    
    return NextResponse.json({message: "Usuário criado"}, {status: 201});
}