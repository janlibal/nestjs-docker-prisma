/*
  Warnings:

  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `hash` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "hash" TEXT NOT NULL;
