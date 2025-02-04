import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async () => {
    const users = await prisma.user.findMany({})
    return NextResponse.json({ message: "Hello, Worldl!", users: users });
};

export const POST = async (request: NextRequest) => {
    const body = await request.json;
    const newUser = await prisma.user.create({
        data: {
            email: body.data.name + "@gmail.com",
            name: body.data.name
        }
    })
    // const { name } = await request.json();
    return NextResponse.json({ message: `Hello, ${body.data.name}`, user: newUser });
};