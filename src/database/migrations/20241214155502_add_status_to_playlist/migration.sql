-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
