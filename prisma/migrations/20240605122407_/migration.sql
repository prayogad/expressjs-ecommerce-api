/*
  Warnings:

  - Added the required column `quantity` to the `detail_payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detail_payment" ADD COLUMN     "quantity" INTEGER NOT NULL;
