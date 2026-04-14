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

  const wildstoneHoles = await Promise.all([
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 1, par: 5, handicap_rating: 9 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 2, par: 4, handicap_rating: 5 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 3, par: 4, handicap_rating: 1 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 4, par: 4, handicap_rating: 15 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 5, par: 4, handicap_rating: 13 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 6, par: 3, handicap_rating: 17 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 7, par: 5, handicap_rating: 3 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 8, par: 3, handicap_rating: 7 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 9, par: 5, handicap_rating: 11 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 10, par: 5, handicap_rating: 18 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 11, par: 4, handicap_rating: 8 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 12, par: 3, handicap_rating: 14 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 13, par: 5, handicap_rating: 16 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 14, par: 4, handicap_rating: 2 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 15, par: 3, handicap_rating: 6 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 16, par: 3, handicap_rating: 10 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 17, par: 4, handicap_rating: 12 } }),
    prisma.hole.create({ data: { course_id: wildstone.id, hole_number: 18, par: 4, handicap_rating: 4 } }),
  ]);

  const bootlegHoles = await Promise.all([
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 1, par: 4, handicap_rating: 9 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 2, par: 5, handicap_rating: 5 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 3, par: 4, handicap_rating: 11 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 4, par: 3, handicap_rating: 17 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 5, par: 5, handicap_rating: 3 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 6, par: 4, handicap_rating: 7 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 7, par: 3, handicap_rating: 15 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 8, par: 4, handicap_rating: 1 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 9, par: 4, handicap_rating: 13 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 10, par: 4, handicap_rating: 2 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 11, par: 4, handicap_rating: 14 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 12, par: 3, handicap_rating: 8 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 13, par: 4, handicap_rating: 10 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 14, par: 4, handicap_rating: 6 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 15, par: 5, handicap_rating: 4 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 16, par: 4, handicap_rating: 12 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 17, par: 3, handicap_rating: 18 } }),
    prisma.hole.create({ data: { course_id: bootlegGap.id, hole_number: 18, par: 5, handicap_rating: 16 } }),
  ]);

  const stEugenesHoles = await Promise.all([
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 1, par: 4, handicap_rating: 15 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 2, par: 5, handicap_rating: 11 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 3, par: 4, handicap_rating: 13 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 4, par: 3, handicap_rating: 17 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 5, par: 4, handicap_rating: 5 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 6, par: 4, handicap_rating: 9 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 7, par: 3, handicap_rating: 7 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 8, par: 4, handicap_rating: 1 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 9, par: 5, handicap_rating: 3 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 10, par: 5, handicap_rating: 2 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 11, par: 4, handicap_rating: 10 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 12, par: 4, handicap_rating: 6 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 13, par: 3, handicap_rating: 14 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 14, par: 4, handicap_rating: 8 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 15, par: 3, handicap_rating: 18 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 16, par: 5, handicap_rating: 16 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 17, par: 3, handicap_rating: 12 } }),
    prisma.hole.create({ data: { course_id: stEugenes.id, hole_number: 18, par: 5, handicap_rating: 4 } }),
  ]);

  console.log("Created holes for all 3 courses");

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
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 5", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 6", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 7", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(1).id, cart_name: "Cart 8", tee_time: "2:00 PM", access_token: crypto.randomUUID() },
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
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 5", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 6", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 7", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(2).id, cart_name: "Cart 8", tee_time: "8:03 AM", access_token: crypto.randomUUID() },
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
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 5", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 6", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 7", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
    prisma.cart.create({
      data: { round_id: round(3).id, cart_name: "Cart 8", tee_time: "8:30 AM", access_token: crypto.randomUUID() },
    }),
  ]);

  console.log("Created", carts.length, "carts");

  // Cart assignments per round based on Excel data
  // carts array is ordered: R1:C1-C8, R2:C1-C8, R3:C1-C8
  // Index:                   0-7,      8-15,      16-23

  const cartAssignments: Record<string, number> = {
    // Round 1 - Wildstone
    "Joe-1": 3, // Cart 4 (Joe & Pete)
    "Scott-1": 5, // Cart 6 (Brock & Scott)
    "Tyson-1": 0, // Cart 1 (Tyson & Jari)
    "Clive-1": 6, // Cart 7 (Craig & Clive)
    "Jari-1": 0, // Cart 1 (Tyson & Jari)
    "Bert-1": 2, // Cart 3 (Steve & Bert)
    "Bill-1": 4, // Cart 5 (Bill & Clay)
    "Steven-1": 2, // Cart 3 (Steve & Bert)
    "Clayton-1": 4, // Cart 5 (Bill & Clay)
    "Craig-1": 6, // Cart 7 (Craig & Clive)
    "Kevin-1": 1, // Cart 2 (Kevin & Dave)
    "Brian-1": 7, // Cart 8 (Lorne & Brian)
    "Dave-1": 1, // Cart 2 (Kevin & Dave)
    "Lorne-1": 7, // Cart 8 (Lorne & Brian)
    "Pete-1": 3, // Cart 4 (Joe & Pete)
    "Brock-1": 5, // Cart 6 (Brock & Scott)

    // Round 2 - Bootleg Gap (offset by 8)
    "Joe-2": 11, // Cart 4 (Joe & Clay)
    "Scott-2": 12, // Cart 5 (Craig & Scott)
    "Tyson-2": 9, // Cart 2 (Tyson & Dave)
    "Clive-2": 14, // Cart 7 (Lorne & Clive)
    "Jari-2": 10, // Cart 3 (Kevin & Jari)
    "Bert-2": 13, // Cart 6 (Bert & Brian)
    "Bill-2": 8, // Cart 1 (Bill & Pete)
    "Steven-2": 15, // Cart 8 (Brock & Steve)
    "Clayton-2": 11, // Cart 4 (Joe & Clay)
    "Craig-2": 12, // Cart 5 (Craig & Scott)
    "Kevin-2": 10, // Cart 3 (Kevin & Jari)
    "Brian-2": 13, // Cart 6 (Bert & Brian)
    "Dave-2": 9, // Cart 2 (Tyson & Dave)
    "Lorne-2": 14, // Cart 7 (Lorne & Clive)
    "Pete-2": 8, // Cart 1 (Bill & Pete)
    "Brock-2": 15, // Cart 8 (Brock & Steve)

    // Round 3 - St. Eugene's (offset by 16)
    "Joe-3": 16, // Cart 1 (Joe & Jari)
    "Scott-3": 22, // Cart 7 (Scott & Lorne)
    "Tyson-3": 23, // Cart 8 (Kevin & Tyson)
    "Clive-3": 17, // Cart 2 (Bill & Clive)
    "Jari-3": 16, // Cart 1 (Joe & Jari)
    "Bert-3": 18, // Cart 3 (Clay & Bert)
    "Bill-3": 17, // Cart 2 (Bill & Clive)
    "Steven-3": 19, // Cart 4 (Pete & Steve)
    "Clayton-3": 18, // Cart 3 (Clay & Bert)
    "Craig-3": 20, // Cart 5 (Dave & Craig)
    "Kevin-3": 23, // Cart 8 (Kevin & Tyson)
    "Brian-3": 21, // Cart 6 (Brock & Brian)
    "Dave-3": 20, // Cart 5 (Dave & Craig)
    "Lorne-3": 22, // Cart 7 (Scott & Lorne)
    "Pete-3": 19, // Cart 4 (Pete & Steve)
    "Brock-3": 21, // Cart 6 (Brock & Brian)
  };

  const cartFor = (playerName: string, roundNum: number) => {
    const index = cartAssignments[`${playerName}-${roundNum}`];
    return carts[index].id;
  };

  const pairings = await Promise.all(
    Object.entries(cartAssignments).map(([key, cartIndex]) => {
      const [playerName, roundNum] = key.split("-");
      return prisma.pairing.create({
        data: {
          player_id: player(playerName).id,
          cart_id: carts[cartIndex].id,
          round_id: round(parseInt(roundNum)).id,
        },
      });
    }),
  );

  console.log("Created", pairings.length, "pairings");

  const scores = await Promise.all([
    // Joe - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Joe").id,
          cart_id: cartFor("Joe", 1),
          hole_number: i + 1,
          strokes: [6, 6, 4, 6, 5, 3, 4, 5, 6, 6, 5, 3, 6, 4, 4, 7, 5, 6][i],
        },
      }),
    ),
    // Joe - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Joe").id,
          cart_id: cartFor("Joe", 2),
          hole_number: i + 1,
          strokes: [5, 5, 6, 4, 4, 4, 6, 4, 6, 5, 6, 2, 4, 5, 5, 4, 2, 6][i],
        },
      }),
    ),
    // Joe - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Joe").id,
          cart_id: cartFor("Joe", 3),
          hole_number: i + 1,
          strokes: [4, 6, 5, 3, 5, 4, 4, 4, 5, 6, 6, 5, 3, 6, 4, 7, 4, 6][i],
        },
      }),
    ),
    // Scott - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Scott").id,
          cart_id: cartFor("Scott", 1),
          hole_number: i + 1,
          strokes: [8, 5, 4, 5, 4, 4, 5, 2, 5, 6, 4, 4, 6, 4, 4, 5, 4, 4][i],
        },
      }),
    ),
    // Scott - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Scott").id,
          cart_id: cartFor("Scott", 2),
          hole_number: i + 1,
          strokes: [4, 4, 6, 4, 5, 5, 3, 5, 5, 4, 7, 2, 5, 3, 4, 5, 5, 5][i],
        },
      }),
    ),
    // Scott - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Scott").id,
          cart_id: cartFor("Scott", 3),
          hole_number: i + 1,
          strokes: [4, 6, 4, 4, 4, 3, 3, 4, 6, 4, 6, 3, 3, 3, 3, 7, 4, 5][i],
        },
      }),
    ),
    // Tyson - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Tyson").id,
          cart_id: cartFor("Tyson", 1),
          hole_number: i + 1,
          strokes: [6, 5, 4, 5, 4, 3, 6, 3, 4, 6, 6, 4, 6, 4, 4, 3, 4, 5][i],
        },
      }),
    ),
    // Tyson - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Tyson").id,
          cart_id: cartFor("Tyson", 2),
          hole_number: i + 1,
          strokes: [4, 5, 4, 3, 6, 4, 4, 4, 5, 5, 4, 3, 5, 4, 5, 5, 3, 5][i],
        },
      }),
    ),
    // Tyson - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Tyson").id,
          cart_id: cartFor("Tyson", 3),
          hole_number: i + 1,
          strokes: [4, 6, 4, 4, 5, 6, 3, 5, 5, 6, 5, 5, 3, 4, 3, 6, 3, 5][i],
        },
      }),
    ),
    // Clive - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Clive").id,
          cart_id: cartFor("Clive", 1),
          hole_number: i + 1,
          strokes: [7, 4, 4, 6, 4, 4, 5, 4, 5, 6, 6, 4, 7, 6, 4, 4, 5, 5][i],
        },
      }),
    ),
    // Clive - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Clive").id,
          cart_id: cartFor("Clive", 2),
          hole_number: i + 1,
          strokes: [5, 6, 4, 3, 7, 5, 3, 5, 5, 5, 6, 5, 5, 5, 6, 4, 4, 9][i],
        },
      }),
    ),
    // Clive - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Clive").id,
          cart_id: cartFor("Clive", 3),
          hole_number: i + 1,
          strokes: [6, 5, 5, 3, 5, 4, 4, 5, 6, 6, 5, 6, 4, 6, 3, 6, 4, 5][i],
        },
      }),
    ),
    // Jari - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Jari").id,
          cart_id: cartFor("Jari", 1),
          hole_number: i + 1,
          strokes: [6, 4, 5, 5, 4, 3, 6, 3, 6, 6, 6, 5, 6, 4, 3, 4, 5, 7][i],
        },
      }),
    ),
    // Jari - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Jari").id,
          cart_id: cartFor("Jari", 2),
          hole_number: i + 1,
          strokes: [5, 6, 5, 4, 5, 4, 3, 4, 5, 5, 4, 6, 6, 4, 7, 5, 4, 5][i],
        },
      }),
    ),
    // Jari - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Jari").id,
          cart_id: cartFor("Jari", 3),
          hole_number: i + 1,
          strokes: [4, 4, 3, 3, 7, 5, 4, 5, 7, 5, 5, 5, 3, 4, 3, 5, 3, 5][i],
        },
      }),
    ),
    // Bert - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Bert").id,
          cart_id: cartFor("Bert", 1),
          hole_number: i + 1,
          strokes: [6, 5, 4, 6, 4, 3, 5, 2, 6, 7, 5, 6, 7, 5, 3, 2, 6, 5][i],
        },
      }),
    ),
    // Bert - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Bert").id,
          cart_id: cartFor("Bert", 2),
          hole_number: i + 1,
          strokes: [3, 6, 5, 4, 8, 6, 3, 4, 5, 5, 5, 3, 4, 4, 6, 5, 4, 7][i],
        },
      }),
    ),
    // Bert - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Bert").id,
          cart_id: cartFor("Bert", 3),
          hole_number: i + 1,
          strokes: [5, 5, 4, 5, 4, 4, 4, 4, 5, 5, 5, 5, 3, 3, 4, 6, 3, 6][i],
        },
      }),
    ),
    // Bill - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Bill").id,
          cart_id: cartFor("Bill", 1),
          hole_number: i + 1,
          strokes: [6, 6, 4, 5, 5, 4, 5, 5, 6, 5, 5, 4, 6, 5, 4, 4, 5, 5][i],
        },
      }),
    ),
    // Bill - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Bill").id,
          cart_id: cartFor("Bill", 2),
          hole_number: i + 1,
          strokes: [4, 6, 5, 4, 4, 5, 3, 4, 4, 4, 4, 3, 5, 4, 5, 4, 4, 5][i],
        },
      }),
    ),
    // Bill - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Bill").id,
          cart_id: cartFor("Bill", 3),
          hole_number: i + 1,
          strokes: [4, 5, 4, 4, 4, 5, 3, 3, 5, 5, 4, 5, 3, 5, 3, 6, 3, 6][i],
        },
      }),
    ),
    // Steven - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Steven").id,
          cart_id: cartFor("Steven", 1),
          hole_number: i + 1,
          strokes: [5, 5, 4, 4, 4, 5, 5, 3, 6, 7, 4, 4, 6, 4, 2, 5, 6, 4][i],
        },
      }),
    ),
    // Steven - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Steven").id,
          cart_id: cartFor("Steven", 2),
          hole_number: i + 1,
          strokes: [4, 5, 5, 4, 4, 4, 3, 4, 8, 5, 5, 2, 7, 4, 5, 6, 5, 7][i],
        },
      }),
    ),
    // Steven - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Steven").id,
          cart_id: cartFor("Steven", 3),
          hole_number: i + 1,
          strokes: [5, 6, 5, 4, 4, 3, 3, 5, 4, 4, 3, 4, 3, 5, 5, 6, 4, 5][i],
        },
      }),
    ),
    // Clayton - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Clayton").id,
          cart_id: cartFor("Clayton", 1),
          hole_number: i + 1,
          strokes: [5, 5, 4, 4, 4, 3, 8, 4, 5, 6, 4, 4, 6, 5, 3, 3, 5, 5][i],
        },
      }),
    ),
    // Clayton - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Clayton").id,
          cart_id: cartFor("Clayton", 2),
          hole_number: i + 1,
          strokes: [5, 6, 4, 5, 5, 4, 2, 4, 5, 4, 4, 3, 4, 5, 6, 5, 4, 5][i],
        },
      }),
    ),
    // Clayton - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Clayton").id,
          cart_id: cartFor("Clayton", 3),
          hole_number: i + 1,
          strokes: [4, 6, 3, 3, 7, 6, 4, 5, 5, 4, 4, 6, 2, 4, 4, 5, 3, 5][i],
        },
      }),
    ),
    // Craig - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Craig").id,
          cart_id: cartFor("Craig", 1),
          hole_number: i + 1,
          strokes: [6, 5, 5, 4, 5, 4, 6, 4, 8, 4, 5, 6, 6, 5, 4, 5, 7, 5][i],
        },
      }),
    ),
    // Craig - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Craig").id,
          cart_id: cartFor("Craig", 2),
          hole_number: i + 1,
          strokes: [6, 6, 5, 5, 6, 5, 4, 5, 5, 6, 2, 3, 5, 4, 7, 7, 4, 6][i],
        },
      }),
    ),
    // Craig - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Craig").id,
          cart_id: cartFor("Craig", 3),
          hole_number: i + 1,
          strokes: [4, 8, 6, 3, 5, 7, 3, 3, 6, 5, 4, 5, 5, 6, 3, 6, 4, 5][i],
        },
      }),
    ),
    // Kevin - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Kevin").id,
          cart_id: cartFor("Kevin", 1),
          hole_number: i + 1,
          strokes: [6, 7, 5, 4, 4, 4, 7, 4, 6, 5, 5, 4, 5, 4, 4, 5, 5, 7][i],
        },
      }),
    ),
    // Kevin - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Kevin").id,
          cart_id: cartFor("Kevin", 2),
          hole_number: i + 1,
          strokes: [6, 6, 5, 4, 5, 6, 3, 5, 5, 3, 4, 3, 3, 5, 4, 4, 3, 4][i],
        },
      }),
    ),
    // Kevin - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Kevin").id,
          cart_id: cartFor("Kevin", 3),
          hole_number: i + 1,
          strokes: [3, 6, 4, 3, 6, 4, 4, 3, 8, 5, 4, 8, 3, 7, 4, 5, 4, 5][i],
        },
      }),
    ),
    // Brian - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Brian").id,
          cart_id: cartFor("Brian", 1),
          hole_number: i + 1,
          strokes: [6, 6, 5, 5, 5, 5, 5, 4, 9, 5, 5, 3, 9, 5, 5, 4, 5, 6][i],
        },
      }),
    ),
    // Brian - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Brian").id,
          cart_id: cartFor("Brian", 2),
          hole_number: i + 1,
          strokes: [6, 4, 5, 3, 7, 4, 3, 4, 7, 3, 5, 4, 5, 4, 5, 5, 4, 8][i],
        },
      }),
    ),
    // Brian - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Brian").id,
          cart_id: cartFor("Brian", 3),
          hole_number: i + 1,
          strokes: [4, 6, 6, 3, 4, 5, 4, 5, 5, 5, 4, 7, 3, 6, 5, 5, 4, 4][i],
        },
      }),
    ),
    // Dave - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Dave").id,
          cart_id: cartFor("Dave", 1),
          hole_number: i + 1,
          strokes: [6, 6, 6, 5, 4, 3, 6, 3, 7, 5, 5, 6, 6, 5, 4, 4, 3, 6][i],
        },
      }),
    ),
    // Dave - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Dave").id,
          cart_id: cartFor("Dave", 2),
          hole_number: i + 1,
          strokes: [4, 5, 5, 3, 6, 4, 3, 4, 5, 3, 4, 4, 6, 4, 6, 5, 4, 4][i],
        },
      }),
    ),
    // Dave - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Dave").id,
          cart_id: cartFor("Dave", 3),
          hole_number: i + 1,
          strokes: [4, 5, 4, 4, 5, 6, 3, 7, 5, 4, 5, 5, 3, 4, 4, 6, 4, 5][i],
        },
      }),
    ),
    // Lorne - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Lorne").id,
          cart_id: cartFor("Lorne", 1),
          hole_number: i + 1,
          strokes: [7, 3, 7, 7, 3, 3, 6, 4, 5, 7, 7, 3, 6, 4, 3, 6, 6, 5][i],
        },
      }),
    ),
    // Lorne - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Lorne").id,
          cart_id: cartFor("Lorne", 2),
          hole_number: i + 1,
          strokes: [6, 4, 5, 5, 7, 4, 5, 4, 8, 4, 4, 4, 5, 4, 5, 6, 4, 6][i],
        },
      }),
    ),
    // Lorne - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Lorne").id,
          cart_id: cartFor("Lorne", 3),
          hole_number: i + 1,
          strokes: [4, 6, 5, 4, 4, 4, 3, 3, 5, 5, 5, 3, 4, 5, 3, 6, 5, 5][i],
        },
      }),
    ),
    // Pete - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Pete").id,
          cart_id: cartFor("Pete", 1),
          hole_number: i + 1,
          strokes: [5, 6, 5, 6, 4, 3, 4, 3, 6, 5, 4, 4, 6, 5, 5, 5, 5, 6][i],
        },
      }),
    ),
    // Pete - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Pete").id,
          cart_id: cartFor("Pete", 2),
          hole_number: i + 1,
          strokes: [4, 8, 4, 3, 5, 4, 4, 4, 5, 5, 4, 3, 4, 4, 6, 4, 3, 7][i],
        },
      }),
    ),
    // Pete - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Pete").id,
          cart_id: cartFor("Pete", 3),
          hole_number: i + 1,
          strokes: [5, 6, 6, 4, 5, 4, 3, 4, 4, 5, 5, 5, 3, 4, 3, 5, 4, 5][i],
        },
      }),
    ),
    // Brock - Round 1
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Brock").id,
          cart_id: cartFor("Brock", 1),
          hole_number: i + 1,
          strokes: [5, 4, 6, 6, 4, 3, 5, 4, 6, 11, 6, 4, 6, 7, 4, 3, 7, 5][i],
        },
      }),
    ),
    // Brock - Round 2
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Brock").id,
          cart_id: cartFor("Brock", 2),
          hole_number: i + 1,
          strokes: [5, 4, 6, 3, 5, 3, 4, 3, 6, 2, 5, 4, 5, 5, 6, 7, 5, 6][i],
        },
      }),
    ),
    // Brock - Round 3
    ...Array.from({ length: 18 }, (_, i) =>
      prisma.score.create({
        data: {
          player_id: player("Brock").id,
          cart_id: cartFor("Brock", 3),
          hole_number: i + 1,
          strokes: [5, 8, 4, 4, 6, 5, 4, 4, 4, 5, 4, 4, 4, 5, 3, 5, 3, 5][i],
        },
      }),
    ),
  ]);

  console.log("Created", scores.length, "scores");

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
