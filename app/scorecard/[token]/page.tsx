"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Hole = {
  id: string;
  hole_number: number;
  par: number;
  handicap_rating: number;
};

type Cart = {
  id: string;
  cart_name: string;
  tee_time: string;
  round: {
    round_number: number;
    course: {
      name: string;
      par: number;
      holes: Hole[];
    };
  };
  pairings: {
    player: {
      id: string;
      first_name: string;
      last_name: string;
    };
  }[];
  scores: {
    id: string;
    player_id: string;
    hole_number: number;
    strokes: number;
  }[];
};

export default function ScorecardPage() {
  const { token } = useParams();
  const [cart, setCart] = useState<Cart | null>(null);
  const [nine, setNine] = useState("front");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/scoring/${token}`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load scorecard");
        setLoading(false);
      });
  }, [token]);

  async function handleScoreEntry(player_id: string, hole_number: number, strokes: number) {
    if (!cart) return;
    await fetch(`/api/scoring/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_id,
        cart_id: cart.id,
        hole_number,
        strokes: Number(strokes),
      }),
    });
  }

  if (loading)
    return (
      <main className="min-h-screen bg-green-950 flex items-center justify-center">
        <p className="text-green-400 text-xl tracking-widest uppercase animate-pulse">Loading scorecard...</p>
      </main>
    );

  if (error)
    return (
      <main className="min-h-screen bg-green-950 flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </main>
    );

  const holes = cart.round.course.holes
    .filter((h) => (nine === "front" ? h.hole_number <= 9 : h.hole_number > 9))
    .sort((a, b) => a.hole_number - b.hole_number);

  const player1 = cart.pairings[0].player;
  const player2 = cart.pairings[1].player;

  return (
    <main className="min-h-screen bg-green-950 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-green-400 uppercase tracking-widest text-sm mb-1">
            Round {cart.round.round_number} • {cart.tee_time}
          </p>
          <h1 className="text-4xl font-bold text-white mb-1">{cart.round.course.name}</h1>
          <p className="text-green-400 text-sm">{cart.cart_name}</p>
          <div className="h-1 w-24 bg-green-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Players */}
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <p className="text-green-400 uppercase tracking-widest text-xs mb-1">Player 1</p>
            <p className="text-white text-xl font-semibold">
              {player1.first_name} {player1.last_name}
            </p>
          </div>
          <div className="text-green-700 text-2xl font-bold self-center">VS</div>
          <div className="text-center">
            <p className="text-green-400 uppercase tracking-widest text-xs mb-1">Player 2</p>
            <p className="text-white text-xl font-semibold">
              {player2.first_name} {player2.last_name}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => setNine("front")}
            className={`flex-1 uppercase tracking-widest text-sm font-bold ${
              nine === "front"
                ? "bg-green-500 text-white hover:bg-green-400"
                : "bg-green-900 text-green-400 hover:bg-green-800"
            }`}
          >
            Front 9
          </Button>
          <Button
            onClick={() => setNine("back")}
            className={`flex-1 uppercase tracking-widest text-sm font-bold ${
              nine === "back"
                ? "bg-green-500 text-white hover:bg-green-400"
                : "bg-green-900 text-green-400 hover:bg-green-800"
            }`}
          >
            Back 9
          </Button>
        </div>

        {/* Scorecard Table */}
        <div className="rounded-xl overflow-hidden border border-green-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-white hover:bg-white border-green-800">
                <TableHead className="text-green-700 font-bold text-center w-12">HOLE</TableHead>
                <TableHead className="text-green-700 font-bold text-center w-12">PAR</TableHead>
                <TableHead className="text-green-700 font-bold text-center">
                  {player1.first_name.toUpperCase()}
                </TableHead>
                <TableHead className="text-green-700 font-bold text-center">
                  {player2.first_name.toUpperCase()}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holes.map((hole, index) => (
                <TableRow
                  key={hole.id}
                  className={`border-green-800 hover:bg-green-900 transition-colors ${
                    index % 2 === 0 ? "bg-green-950" : "bg-green-900/50"
                  }`}
                >
                  <TableCell className="text-white font-bold text-center">{hole.hole_number}</TableCell>
                  <TableCell className="text-green-400 text-center">{hole.par}</TableCell>
                  <TableCell className="text-center">
                    <input
                      type="number"
                      defaultValue={
                        cart.scores.find((s) => s.player_id === player1.id && s.hole_number === hole.hole_number)
                          ?.strokes ?? ""
                      }
                      onBlur={(e) => handleScoreEntry(player1.id, hole.hole_number, Number(e.target.value))}
                      className="w-14 h-10 text-center text-white font-bold text-lg bg-green-800 border border-green-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="number"
                      defaultValue={
                        cart.scores.find((s) => s.player_id === player2.id && s.hole_number === hole.hole_number)
                          ?.strokes ?? ""
                      }
                      onBlur={(e) => handleScoreEntry(player2.id, hole.hole_number, Number(e.target.value))}
                      className="w-14 h-10 text-center text-white font-bold text-lg bg-green-800 border border-green-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <p className="text-green-700 text-center text-sm mt-6">
          Kimberley Spring Open • {nine === "front" ? "Front 9" : "Back 9"}
        </p>
      </div>
    </main>
  );
}
