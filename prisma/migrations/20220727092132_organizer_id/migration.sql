/*
  Warnings:

  - You are about to drop the column `organizerID` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `organizerId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_organizerID_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "organizerID",
ADD COLUMN     "organizerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
