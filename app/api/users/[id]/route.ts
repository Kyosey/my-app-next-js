import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const userId = parseInt(params.id, 10); // Convertir l'ID en nombre

        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error); // Ajout du log
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const userId = parseInt(params.id, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const body = await request.json();

        // Vérifier que toutes les données requises sont présentes
        if (!body.data.name) {
            return NextResponse.json({ error: "Missing required fields: name" }, { status: 400 });
        }

        // Vérifier si l'utilisateur existe avant de le mettre à jour
        const existingUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Mettre à jour l'utilisateur (remplace toutes les valeurs)
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: body.data.name,
            },
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};