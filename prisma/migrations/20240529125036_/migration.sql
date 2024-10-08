/*
  Warnings:

  - The primary key for the `carts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_username]` on the table `carts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "carts" DROP CONSTRAINT "carts_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_username_key" ON "carts"("user_username");
