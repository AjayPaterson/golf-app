import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import crypto from "crypto";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const tournament = await prisma.tournament.create({
    data: {
      name: "Kimberley Spring Open",
      year: 2023,
      location: "Kimberley, BC",
      number_of_rounds: 3,
    },
  });

  console.log("Created tournament:", tournament.name);

  const wildstone = await prisma.course.create({
    data: {
      name: "Wildstone Golf Course",
      location: "Cranbrook, BC",
      par: 72,
      course_rating: 72.0,
      slope_rating: 130,
    },
  });

  const bootlegGap = await prisma.course.create({
    data: {
      name: "Bootleg Gap Golf",
      location: "Kimberley, BC",
      par: 72,
      course_rating: 70.5,
      slope_rating: 125,
    },
  });

  const stEugenes = await prisma.course.create({
    data: {
      name: "St. Eugene's Golf Resort",
      location: "Cranbrook, BC",
      par: 72,
      course_rating: 73.0,
      slope_rating: 135,
    },
  });

  console.log("Created courses:", wildstone.name, bootlegGap.name, stEugenes.name);

  const players = await Promise.all([
    prisma.player.create({ data: { first_name: "Joe", last_name: "", handicap_index: 11 } }),
    prisma.player.create({ data: { first_name: "Scott", last_name: "", handicap_index: 18 } }),
    prisma.player.create({ data: { first_name: "Tyson", last_name: "", handicap_index: 8 } }),
    prisma.player.create({ data: { first_name: "Clive", last_name: "", handicap_index: 22 } }),
    prisma.player.create({ data: { first_name: "Jari", last_name: "", handicap_index: 8 } }),
    prisma.player.create({ data: { first_name: "Bert", last_name: "", handicap_index: 22 } }),
    prisma.player.create({ data: { first_name: "Bill", last_name: "", handicap_index: 9 } }),
    prisma.player.create({ data: { first_name: "Steven", last_name: "", handicap_index: 20 } }),
    prisma.player.create({ data: { first_name: "Clayton", last_name: "", handicap_index: 10 } }),
    prisma.player.create({ data: { first_name: "Craig", last_name: "", handicap_index: 18 } }),
    prisma.player.create({ data: { first_name: "Kevin", last_name: "", handicap_index: 10 } }),
    prisma.player.create({ data: { first_name: "Brian", last_name: "", handicap_index: 14 } }),
    prisma.player.create({ data: { first_name: "Dave", last_name: "", handicap_index: 10 } }),
    prisma.player.create({ data: { first_name: "Lorne", last_name: "", handicap_index: 16 } }),
    prisma.player.create({ data: { first_name: "Pete", last_name: "", handicap_index: 12 } }),
    prisma.player.create({ data: { first_name: "Brock", last_name: "", handicap_index: 14 } }),
  ]);

  console.log("Created", players.length, "players");

  const teams = await Promise.all([
    prisma.team.create({ data: { name: "Joe & Scott", tournament_id: tournament.id, adjusted_handicap: 21 } }),
    prisma.team.create({ data: { name: "Tyson & Clive", tournament_id: tournament.id, adjusted_handicap: 23 } }),
    prisma.team.create({ data: { name: "Jari & Bert", tournament_id: tournament.id, adjusted_handicap: 23 } }),
    prisma.team.create({ data: { name: "Bill & Steven", tournament_id: tournament.id, adjusted_handicap: 22 } }),
    prisma.team.create({ data: { name: "Clayton & Craig", tournament_id: tournament.id, adjusted_handicap: 22 } }),
    prisma.team.create({ data: { name: "Kevin & Brian", tournament_id: tournament.id, adjusted_handicap: 20 } }),
    prisma.team.create({ data: { name: "Dave & Lorne", tournament_id: tournament.id, adjusted_handicap: 20 } }),
    prisma.team.create({ data: { name: "Pete & Brock", tournament_id: tournament.id, adjusted_handicap: 20 } }),
  ]);

  console.log("Created", teams.length, "teams");

  const rounds = await Promise.all([
    prisma.round.create({
      data: {
        tournament_id: tournament.id,
        course_id: wildstone.id,
        round_number: 1,
        date: new Date("2023-06-01"),
      },
    }),
    prisma.round.create({
      data: {
        tournament_id: tournament.id,
        course_id: bootlegGap.id,
        round_number: 2,
        date: new Date("2023-06-02"),
      },
    }),
    prisma.round.create({
      data: {
        tournament_id: tournament.id,
        course_id: stEugenes.id,
        round_number: 3,
        date: new Date("2023-06-03"),
      },
    }),
  ]);

  console.log("Created", rounds.length, "rounds");

  // Helper to find players and teams by name
  const player = (name: string) => players.find((p) => p.first_name === name)!;

  const team = (name: string) => teams.find((t) => t.name === name)!;

  const registrations = await Promise.all([
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Joe").id,
        team_id: team("Joe & Scott").id,
        full_handicap: 11,
        three_quarter_handicap: 9,
        adjusted_handicap: 3,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Scott").id,
        team_id: team("Joe & Scott").id,
        full_handicap: 18,
        three_quarter_handicap: 14,
        adjusted_handicap: 8,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Tyson").id,
        team_id: team("Tyson & Clive").id,
        full_handicap: 8,
        three_quarter_handicap: 6,
        adjusted_handicap: 0,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Clive").id,
        team_id: team("Tyson & Clive").id,
        full_handicap: 22,
        three_quarter_handicap: 17,
        adjusted_handicap: 11,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Jari").id,
        team_id: team("Jari & Bert").id,
        full_handicap: 8,
        three_quarter_handicap: 6,
        adjusted_handicap: 0,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Bert").id,
        team_id: team("Jari & Bert").id,
        full_handicap: 22,
        three_quarter_handicap: 17,
        adjusted_handicap: 11,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Bill").id,
        team_id: team("Bill & Steven").id,
        full_handicap: 9,
        three_quarter_handicap: 7,
        adjusted_handicap: 1,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Steven").id,
        team_id: team("Bill & Steven").id,
        full_handicap: 20,
        three_quarter_handicap: 15,
        adjusted_handicap: 9,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Clayton").id,
        team_id: team("Clayton & Craig").id,
        full_handicap: 10,
        three_quarter_handicap: 8,
        adjusted_handicap: 2,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Craig").id,
        team_id: team("Clayton & Craig").id,
        full_handicap: 18,
        three_quarter_handicap: 14,
        adjusted_handicap: 8,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Kevin").id,
        team_id: team("Kevin & Brian").id,
        full_handicap: 10,
        three_quarter_handicap: 8,
        adjusted_handicap: 2,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Brian").id,
        team_id: team("Kevin & Brian").id,
        full_handicap: 14,
        three_quarter_handicap: 11,
        adjusted_handicap: 5,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Dave").id,
        team_id: team("Dave & Lorne").id,
        full_handicap: 10,
        three_quarter_handicap: 8,
        adjusted_handicap: 2,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Lorne").id,
        team_id: team("Dave & Lorne").id,
        full_handicap: 16,
        three_quarter_handicap: 12,
        adjusted_handicap: 6,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Pete").id,
        team_id: team("Pete & Brock").id,
        full_handicap: 12,
        three_quarter_handicap: 9,
        adjusted_handicap: 3,
      },
    }),
    prisma.registration.create({
      data: {
        tournament_id: tournament.id,
        player_id: player("Brock").id,
        team_id: team("Pete & Brock").id,
        full_handicap: 14,
        three_quarter_handicap: 11,
        adjusted_handicap: 5,
      },
    }),
  ]);

  console.log("Created", registrations.length, "registrations");

  const round = (num: number) => rounds.find((r) => r.round_number === num)!;

  const carts = await Promise.all([
    // Round 1 - Wildstone (2:00 PM)
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 1", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 2", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 3", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 4", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
    }),

    // Round 2 - Bootleg Gap (8:03 AM)
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 1", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 2", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 3", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 4", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
    }),

    // Round 3 - St. Eugene's (8:30 AM)
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 1", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 2", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 3", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 4", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
  ]);

  console.log("Created", carts.length, "carts");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
