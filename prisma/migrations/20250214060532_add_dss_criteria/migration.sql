-- CreateTable
CREATE TABLE "DssCriteria" (
    "dssCriteriaId" SERIAL NOT NULL,
    "dssId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DssCriteria_pkey" PRIMARY KEY ("dssCriteriaId")
);

-- AddForeignKey
ALTER TABLE "DssCriteria" ADD CONSTRAINT "DssCriteria_dssId_fkey" FOREIGN KEY ("dssId") REFERENCES "Dss"("dssId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DssCriteria" ADD CONSTRAINT "DssCriteria_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("criteriaId") ON DELETE RESTRICT ON UPDATE CASCADE;
