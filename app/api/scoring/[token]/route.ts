import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const cart = await prisma.cart.findUnique({
    where: { access_token: token },
    include: {
      round: {
        include: {
          course: true,
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
