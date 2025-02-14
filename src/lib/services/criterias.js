import prisma from '../prisma';
import { buildCriteriaTree } from './topics.js';

export const createCriteria = async (data) => {
  
    const criteria = await prisma.criteria.create({
        data: data,
    });
    
    return criteria;
};

export const updateCriteria = async (criteriaId, data) => {
  
    const criteria = await prisma.criteria.update({
        where: { criteriaId: parseInt(criteriaId) },
        data: data,
    });
    
    return criteria;
};

export const getCriteriaById = async (criteriaId) => {

    const criteria = await prisma.criteria.findUnique({
        where: { criteriaId: parseInt(criteriaId) },
        select: {
            criteriaId: true,
            name: true,
            description: true,
            type: true,
            weight: true,
            parentCriteriaId: true
        }
    });
  
    return criteria;
};

// NITIP
export const createDssCriteria = async (data) => {
    const dssCriteria = await prisma.dssCriteria.create({
        data: data,
    });
    
    return dssCriteria;
};

export const getDssCriteria = async (q) => {
    console.log(q)
    const dssCriterias = await prisma.dssCriteria.findMany({
        where: q,
        select: {
            criteria: {
                select: {
                    criteriaId: true,
                    name: true,
                    description: true,
                    type: true,
                    weight: true,
                    parentCriteriaId: true
                }
            },
    }});
    const criteriaList = dssCriterias.flatMap(Object.values);    
    const criteriaTree = buildCriteriaTree(criteriaList);
    
    return criteriaTree;
};

export const deleteDssCriteria = async (criteriaId, dssId) => {

    const _ = await prisma.dssCriteriaAlternative.deleteMany({
      where: { 
        AND: [
          { criteriaId: criteriaId },
          { dssId: dssId },
        ], 
      },
    });
    const status = await prisma.dssCriteria.deleteMany({
      where: {
        AND: [
          { criteriaId: criteriaId },
          { dssId: dssId },
        ],
      }
    });

  return;
};
