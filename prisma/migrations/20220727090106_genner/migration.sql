/*
  Warnings:

  - Changed the type of `lat` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `long` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `distance` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "lat",
ADD COLUMN     "lat" INTEGER NOT NULL,
DROP COLUMN "long",
ADD COLUMN     "long" INTEGER NOT NULL,
DROP COLUMN "distance",
ADD COLUMN     "distance" INTEGER NOT NULL;
