-- CreateTable
CREATE TABLE "Hole" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "hole_number" INTEGER NOT NULL,
    "par" INTEGER NOT NULL,
    "handicap_rating" INTEGER NOT NULL,

    CONSTRAINT "Hole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hole" ADD CONSTRAINT "Hole_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
