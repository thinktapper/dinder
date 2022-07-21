/*
  Warnings:

  - You are about to drop the `UsersOnMeal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnMeal" DROP CONSTRAINT "UsersOnMeal_mealID_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnMeal" DROP CONSTRAINT "UsersOnMeal_userID_fkey";

-- DropTable
DROP TABLE "UsersOnMeal";

-- CreateTable
CREATE TABLE "_JoinedMeals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JoinedMeals_AB_unique" ON "_JoinedMeals"("A", "B");

-- CreateIndex
CREATE INDEX "_JoinedMeals_B_index" ON "_JoinedMeals"("B");

-- AddForeignKey
ALTER TABLE "_JoinedMeals" ADD CONSTRAINT "_JoinedMeals_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JoinedMeals" ADD CONSTRAINT "_JoinedMeals_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
