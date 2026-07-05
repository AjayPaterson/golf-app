/*
  Warnings:

  - You are about to drop the column `course_rating` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `par` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `slope_rating` on the `Course` table. All the data in the column will be lost.
  - Added the required column `play_format` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlayFormat" AS ENUM ('stroke_play', 'match_play', 'best_ball', 'scramble', 'stableford');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "course_rating",
DROP COLUMN "par",
DROP COLUMN "slope_rating";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "play_format" "PlayFormat" NOT NULL;

-- AlterTable
ALTER TABLE "Pairing" ADD COLUMN     "tee_id" TEXT;

-- CreateTable
CREATE TABLE "Tee" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yardage" INTEGER NOT NULL,
    "course_rating" DOUBLE PRECISION NOT NULL,
    "slope_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasualRegistrationDetails" (
    "id" TEXT NOT NULL,
    "play_format" "PlayFormat" NOT NULL,
    "stroke_allowance" INTEGER,
    "registration_id" TEXT NOT NULL,

    CONSTRAINT "CasualRegistrationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CasualRegistrationDetails_registration_id_key" ON "CasualRegistrationDetails"("registration_id");

-- AddForeignKey
ALTER TABLE "Tee" ADD CONSTRAINT "Tee_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pairing" ADD CONSTRAINT "Pairing_tee_id_fkey" FOREIGN KEY ("tee_id") REFERENCES "Tee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasualRegistrationDetails" ADD CONSTRAINT "CasualRegistrationDetails_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
