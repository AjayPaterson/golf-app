"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Table, TableHeader } from "@/components/ui/table";

type Cart = {
  id: string;
  cart_name: string;
  tee_time: string;
  round: {
    round_number: number;
    course: {
      name: string;
      par: number;
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
      .catch((err) => {
        setError("Failed to load scorecard");
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div>Loading scorecard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Tournament name</h1>
      <h2>{cart.round.course.name}</h2>

      {/* Toggle Buttons */}
      <button onClick={() => setNine("front")}>Front 9</button>
      <button onClick={() => setNine("back")}>Back 9</button>
      <table>
        <thead>
          <tr>
            <th>Hole</th>
            <th>Par</th>
            <th>{cart.pairings[0].player.first_name}</th>
            <th>{cart.pairings[1].player.first_name}</th>
          </tr>
        </thead>
        <tbody>
          {cart.round.course.holes
            .filter((h) => (nine === "front" ? h.hole_number <= 9 : h.hole_number > 9))
            .map((hole) => (
              <tr key={hole.id}>
                <td>{hole.hole_number}</td>
                <td>{hole.par}</td>
                <td>
                  <input type="number" />
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
