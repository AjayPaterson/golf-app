/*
  Warnings:

  - You are about to drop the column `adjusted_handicap` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `full_handicap` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `three_quarter_handicap` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `tournament_id` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `tournament_id` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `tournament_id` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Tournament` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event_id` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('casual', 'challenge', 'league', 'tournament');

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_team_id_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_tournament_id_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_tournament_id_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_tournament_id_fkey";

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "adjusted_handicap",
DROP COLUMN "full_handicap",
DROP COLUMN "three_quarter_handicap",
DROP COLUMN "tournament_id",
ADD COLUMN     "event_id" TEXT NOT NULL,
ALTER COLUMN "team_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "tournament_id",
ADD COLUMN     "event_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "tournament_id",
ADD COLUMN     "event_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tournament";

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentDetails" (
    "id" TEXT NOT NULL,
    "number_of_rounds" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "TournamentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationDetails" (
    "id" TEXT NOT NULL,
    "full_handicap" INTEGER NOT NULL,
    "three_quarter_handicap" INTEGER NOT NULL,
    "adjusted_handicap" INTEGER NOT NULL,
    "registration_id" TEXT NOT NULL,

    CONSTRAINT "RegistrationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TournamentDetails_event_id_key" ON "TournamentDetails"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationDetails_registration_id_key" ON "RegistrationDetails"("registration_id");

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentDetails" ADD CONSTRAINT "TournamentDetails_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationDetails" ADD CONSTRAINT "RegistrationDetails_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
