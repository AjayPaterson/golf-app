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
                include: {
                  cart: {
                    include: {
                      round: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const leaderboard = teams.map((team) => {
    //collect all scores across all players on this team
    const allScores = team.registrations.flatMap((reg) => reg.player.scores);

    //round calculation
    const grouped = allScores.reduce((acc: Record<number, Record<number, number[]>>, score) => {
      const round = score.cart.round.round_number;
      const hole = score.hole_number;

      // if this round doesn't exist, create it
      if (!acc[round]) acc[round] = {};

      // if this hole doesn't exist, create it
      if (!acc[round][hole]) acc[round][hole] = [];

      // push this score into the right bucket
      acc[round][hole].push(score.strokes);

      return acc;
    }, {});

    const rounds = Object.entries(grouped).map(([roundNumber, holes]) => {
      const roundScore = Object.values(holes).reduce((total, holeScores) => {
        return total + Math.min(...holeScores);
      }, 0);

      return {
        roundNumber: Number(roundNumber),
        score: roundScore,
      };
    });

    const total = rounds.reduce((sum, round) => sum + round.score, 0);

    return {
      teamName: team.name,
      players: team.registrations.map((reg) => reg.player.first_name),
      rounds: rounds,
      total: total,
    };
  });

  leaderboard.sort((a, b) => a.total - b.total);
  return NextResponse.json(leaderboard);
}
