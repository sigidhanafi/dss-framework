import prisma from '../prisma';

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
      parentCriteriaId: true,
    },
  });

  return criteria;
};
