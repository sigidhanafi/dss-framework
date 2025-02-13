/*
  Warnings:

  - You are about to drop the column `userId` on the `Topic` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Dss` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_userId_fkey";

-- AlterTable
ALTER TABLE "Dss" ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "userId",
ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dss" ADD CONSTRAINT "Dss_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
