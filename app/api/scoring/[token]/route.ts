import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  console.log("Token received:", token);

  const cart = await prisma.cart.findUnique({
    where: { access_token: token },
    include: {
      round: {
        include: {
          course: {
            include: {
              holes: {
                orderBy: {
                  hole_number: "asc",
                },
              },
            },
          },
        },
      },
      pairings: {
        include: {
          player: true,
        },
      },
      scores: true,
    },
  });

  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  return NextResponse.json(cart);
}

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { player_id, cart_id, hole_number, strokes } = await request.json();
  try {
    const score = await prisma.score.upsert({
      where: {
        player_id_hole_number_cart_id: {
          player_id,
          hole_number,
          cart_id,
        },
      },
      update: {
        strokes,
      },
      create: {
        player_id,
        cart_id,
        hole_number,
        strokes,
      },
    });

    return NextResponse.json(score, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create score" }, { status: 500 });
  }
}
