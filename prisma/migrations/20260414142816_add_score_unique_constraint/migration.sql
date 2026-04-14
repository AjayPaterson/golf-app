/*
  Warnings:

  - A unique constraint covering the columns `[player_id,hole_number,cart_id]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Score_player_id_hole_number_cart_id_key" ON "Score"("player_id", "hole_number", "cart_id");
