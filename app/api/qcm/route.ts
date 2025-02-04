import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async () => {
    const qcms = await prisma.qcm.findMany({})
    return NextResponse.json({ message: "Success !", qcms: qcms });
};

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const newQcm = await prisma.qcm.create({
        data: {
            title: body.data.name + "@gmail.com"
        }
    })
    // const { name } = await request.json();
    return NextResponse.json({ message: `Hello, ${body.data.name}`, user: newQcm });
};