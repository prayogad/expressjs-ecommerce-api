/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usernmae` on the `admin` table. All the data in the column will be lost.
  - Added the required column `username` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" DROP CONSTRAINT "admin_pkey",
DROP COLUMN "usernmae",
ADD COLUMN     "username" VARCHAR(100) NOT NULL,
ADD CONSTRAINT "admin_pkey" PRIMARY KEY ("username");
