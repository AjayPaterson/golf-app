import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const teams = await prisma.team.findMany({
    include: {
      registrations: {
        include: {
          player: {
            include: {
              scores: {
                orderBy: [{ cart_id: "asc" }, { hole_number: "asc" }],
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(teams);
}
