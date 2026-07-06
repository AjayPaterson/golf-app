import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
   

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const { name, start_date, play_format, course_id, player_ids } = await request.json()

    if (!name || !start_date || !play_format || !course_id || !player_ids) {
        return NextResponse.json(
            { error: "Fields cannot be blank" },
            { status: 400 }
        )
    }

    try {
        const event = await prisma.event.create({
            data: {
                type: 'casual',
                name,
                start_date: new Date(start_date),
                end_date: new Date(start_date),
                play_format,
            }
        })

        const eventOrganizer = await prisma.eventOrganizer.create({
            data: {
                user_id: user.id,
                event_id: event.id,
            }  
        })

        const round = await prisma.round.create({
            data: {
                event_id: event.id,
                course_id: course_id,
                round_number: 1,
                date: new Date(start_date),
            }
        })

        await prisma.registration.createMany({
            data: player_ids.map((player_id: string) => ({
                player_id,
                event_id: event.id,
            }))
        })

        
            return NextResponse.json(
            { message: 'Event created successfully!'},
            { status: 201 }
            )
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        )
    }
    
}