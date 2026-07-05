import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const players = await prisma.player.findMany({
        where: {
            user_id: { not: null },
            OR: [
                {first_name : { contains: search, mode: 'insensitive'} },
                {last_name : { contains: search, mode: 'insensitive'} },
            ]
        },
        orderBy: { last_name: 'asc' },
    })

    return NextResponse.json(players)
}

export async function POST(request: NextRequest) {
    const { first_name, last_name } = await request.json()

    if (!first_name || !last_name) {
        return NextResponse.json(
            { error: 'First name and last name are required!'},
            { status: 400 }
        )
    }

    await prisma.player.create({
        data: {
            first_name,
            last_name
        }
    })

    return NextResponse.json(
        { message: "Guest player created!"},
        { status: 201 }
    )
}