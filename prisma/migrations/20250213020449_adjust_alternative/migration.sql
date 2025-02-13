/*
  Warnings:

  - You are about to drop the column `alternativeName` on the `DssAlternative` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `DssAlternative` table. All the data in the column will be lost.
  - You are about to drop the `DssCriteria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alternativeId` to the `DssAlternative` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DssCriteria" DROP CONSTRAINT "DssCriteria_criteriaId_fkey";

-- DropForeignKey
ALTER TABLE "DssCriteria" DROP CONSTRAINT "DssCriteria_dssAlternativeId_fkey";

-- AlterTable
ALTER TABLE "DssAlternative" DROP COLUMN "alternativeName",
DROP COLUMN "description",
ADD COLUMN     "alternativeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DssCriteria";

-- CreateTable
CREATE TABLE "Alternative" (
    "alternativeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "topicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alternative_pkey" PRIMARY KEY ("alternativeId")
);

-- CreateTable
CREATE TABLE "DssCriteriaAlternative" (
    "dssCriteriaAlternativeId" SERIAL NOT NULL,
    "dssId" INTEGER NOT NULL,
    "alternativeId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DssCriteriaAlternative_pkey" PRIMARY KEY ("dssCriteriaAlternativeId")
);

-- AddForeignKey
ALTER TABLE "Alternative" ADD CONSTRAINT "Alternative_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("topicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DssAlternative" ADD CONSTRAINT "DssAlternative_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "Alternative"("alternativeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DssCriteriaAlternative" ADD CONSTRAINT "DssCriteriaAlternative_dssId_fkey" FOREIGN KEY ("dssId") REFERENCES "Dss"("dssId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DssCriteriaAlternative" ADD CONSTRAINT "DssCriteriaAlternative_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "Alternative"("alternativeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DssCriteriaAlternative" ADD CONSTRAINT "DssCriteriaAlternative_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("criteriaId") ON DELETE RESTRICT ON UPDATE CASCADE;
