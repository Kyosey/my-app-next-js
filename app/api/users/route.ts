import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async () => {
    const users = await prisma.user.findMany({})
    return NextResponse.json({ users: users });
};

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const newUser = await prisma.user.create({
        data: {
            name: body.data.name,
        }
    })
    return NextResponse.json({ users: newUser });
};