-- CreateTable
CREATE TABLE "DssCriteria" (
    "dssCriteriaId" SERIAL NOT NULL,
    "dssAlternativeId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DssCriteria_pkey" PRIMARY KEY ("dssCriteriaId")
);

-- AddForeignKey
ALTER TABLE "DssCriteria" ADD CONSTRAINT "DssCriteria_dssAlternativeId_fkey" FOREIGN KEY ("dssAlternativeId") REFERENCES "DssAlternative"("dssAlternativeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DssCriteria" ADD CONSTRAINT "DssCriteria_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria"("criteriaId") ON DELETE RESTRICT ON UPDATE CASCADE;
