import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── Courses ──────────────────────────────────────────────
  const rundlePark = await prisma.course.create({
    data: {
      name: "Rundle Park Short Course",
      location: "Edmonton, AB",
    },
  });

  const wildstone = await prisma.course.create({
    data: {
      name: "Wildstone Golf Course",
      location: "Cranbrook, BC",
    },
  });

  const bootlegGap = await prisma.course.create({
    data: {
      name: "Bootleg Gap Golf",
      location: "Kimberley, BC",
    },
  });

  const stEugenes = await prisma.course.create({
    data: {
      name: "St. Eugene's Golf Resort",
      location: "Cranbrook, BC",
    },
  });

  console.log("Created courses");

  // ── Tees ─────────────────────────────────────────────────
  const rundleBlack = await prisma.tee.create({
    data: {
      course_id: rundlePark.id,
      name: "Black",
      yardage: 3037,
      course_rating: 0.0,
      slope_rating: 0.0,
    },
  });

  const rundleWhite = await prisma.tee.create({
    data: {
      course_id: rundlePark.id,
      name: "White",
      yardage: 2775,
      course_rating: 0.0,
      slope_rating: 0.0,
    },
  });

  const rundleShortees = await prisma.tee.create({
    data: {
      course_id: rundlePark.id,
      name: "Shortees",
      yardage: 1574,
      course_rating: 0.0,
      slope_rating: 0.0,
    },
  });

  console.log("Created Rundle Park tees");

  // ── Holes ─────────────────────────────────────────────────
  await Promise.all([
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 1,  par: 3, handicap_rating: 3  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 2,  par: 3, handicap_rating: 12 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 3,  par: 4, handicap_rating: 6  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 4,  par: 3, handicap_rating: 2  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 5,  par: 4, handicap_rating: 13 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 6,  par: 3, handicap_rating: 11 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 7,  par: 3, handicap_rating: 8  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 8,  par: 3, handicap_rating: 10 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 9,  par: 3, handicap_rating: 15 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 10, par: 3, handicap_rating: 7  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 11, par: 3, handicap_rating: 14 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 12, par: 3, handicap_rating: 16 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 13, par: 4, handicap_rating: 9  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 14, par: 4, handicap_rating: 4  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 15, par: 3, handicap_rating: 1  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 16, par: 3, handicap_rating: 5  } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 17, par: 3, handicap_rating: 17 } }),
    prisma.hole.create({ data: { course_id: rundlePark.id, hole_number: 18, par: 3, handicap_rating: 18 } }),
  ]);

  console.log("Created Rundle Park holes");

  // ── User + Player ─────────────────────────────────────────
 const user = await prisma.user.upsert({
  where: { id: '00935a4b-9db1-4fad-ab97-1eb5699db1c8' },
  update: {
    is_admin: true,
    display_name: 'Ajay',
  },
  create: {
    id: '00935a4b-9db1-4fad-ab97-1eb5699db1c8',
    is_admin: true,
    display_name: 'Ajay',
  },
})

const ajay = await prisma.player.create({
  data: {
    first_name: 'Ajay',
    last_name: 'Paterson',
    handicap_index: 10.5,
    user_id: user.id,
  },
})

console.log("Created user and player:", ajay.first_name);

console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect()
  });