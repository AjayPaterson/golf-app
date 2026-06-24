import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@/utils/supabase/server'
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()

    if (!email || !password) {
        return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
        )
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }

    if (!data.user) {
        return NextResponse.json(
            { error: 'Signup failed - no user returned' },
            { status: 500 }
        )
    }

    await prisma.user.create({
        data: {
            id: data.user.id
        }
    })

    return NextResponse.json(
        { message: 'Account created successfully' },
        { status: 201 }
    )
}