/*
  Warnings:

  - You are about to drop the column `statusId` on the `Playlist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_statusId_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "statusId";
