import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Round = {
  roundNumber: number;
  score: number;
  par: number;
};

type TeamEntry = {
  teamName: string;
  players: string[];
  rounds: Round[];
  total: number;
};

async function getLeaderboard() {
  const res = await fetch("http://localhost:3000/api/leaderboard", {
    cache: "no-store",
  });
  return res.json();
}

function PositionBadge({ position }: { position: number }) {
  if (position === 1) return <Badge className="bg-yellow-500 text-black font-bold">1</Badge>;
  if (position === 2) return <Badge className="bg-gray-400 text-black font-bold">2</Badge>;
  if (position === 3) return <Badge className="bg-amber-600 text-white font-bold">3</Badge>;
  return <Badge className="bg-green-800 text-white font-bold">{position}</Badge>;
}

function ScoreColor({ score, par }: { score: number; par: number }) {
  if (score < par) return <span className="text-green-600 font-bold font-mono text-lg">{score}</span>;
  if (score === par) return <span className="text-black font-mono text-lg">{score}</span>;
  return <span className="text-red-600 font-mono text-lg">{score}</span>;
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="min-h-screen bg-green-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-green-400 uppercase tracking-widest text-sm mb-2">2023</p>
          <h1 className="text-5xl font-bold text-white mb-2">Kimberley Spring Open</h1>
          <div className="h-1 w-24 bg-green-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-xl overflow-hidden border border-green-800">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 hover:bg-gray-50 transition-colors bg-white">
                <TableHead className="text-green-400 font-bold w-12 text-center">POS</TableHead>
                <TableHead className="text-green-400 font-bold">TEAM</TableHead>
                <TableHead className="text-green-400 font-bold text-center">RD 1</TableHead>
                <TableHead className="text-green-400 font-bold text-center">RD 2</TableHead>
                <TableHead className="text-green-400 font-bold text-center">RD 3</TableHead>
                <TableHead className="text-green-400 font-bold text-center">TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((team: TeamEntry, index: number) => {
                const roundMap = Object.fromEntries(team.rounds.map((r: Round) => [r.roundNumber, r.score]));
                return (
                  <TableRow key={team.teamName} className="border-gray-200 hover:bg-gray-50 transition-colors bg-white">
                    <TableCell className="text-center">
                      <PositionBadge position={index + 1} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-black font-semibold text-lg">{team.teamName}</p>
                        <p className="text-gray-500 text-sm">{team.players.join(" & ")}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-white font-mono text-lg">
                      {roundMap[1] !== undefined ? (
                        <ScoreColor
                          score={roundMap[1]}
                          par={team.rounds.find((r: Round) => r.roundNumber === 1)?.par ?? 72}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-center text-white font-mono text-lg">
                      {roundMap[2] !== undefined ? (
                        <ScoreColor
                          score={roundMap[2]}
                          par={team.rounds.find((r: Round) => r.roundNumber === 2)?.par ?? 72}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-center text-white font-mono text-lg">
                      {roundMap[3] !== undefined ? (
                        <ScoreColor
                          score={roundMap[3]}
                          par={team.rounds.find((r: Round) => r.roundNumber === 3)?.par ?? 72}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-center text-green-400 font-bold font-mono text-xl">
                      {team.total}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <p className="text-green-700 text-center text-sm mt-6">Best ball scoring • 3 rounds</p>
      </div>
    </main>
  );
}
