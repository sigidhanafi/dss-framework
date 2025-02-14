import prisma from '../prisma';

export const createAlternative = async (topicId, name, description) => {
  const alternative = await prisma.alternative.create({
    data: { topicId, name, description },
  });

  return alternative;
};

export const getAlternatives = async (q = {}) => {
  console.log(q);
  const alternatives = await prisma.alternative.findMany({
    where: q,
    select: {
      alternativeId: true,
      name: true,
      description: true,
    },
  });

  return alternatives;
};

export const getOneAlternative = async (q = {}) => {
  const alternative = await prisma.alternative.findUnique({
    where: q,
    select: {
      alternativeId: true,
      name: true,
      description: true,
    },
  });

  return alternative;
};

export const updateAlternative = async (alternativeId, data) => {
  const criteria = await prisma.alternative.update({
    where: { alternativeId: parseInt(alternativeId) },
    data: data,
  });

  return criteria;
};

export const deleteAlternative = async (alternativeId) => {
  const _ = await prisma.alternative.delete({
    where: { alternativeId: parseInt(alternativeId) },
  });

  return;
};

// NITIP DULU
export const deleteDssAlternative = async (alternativeId, dssId) => {
    console.log(alternativeId);
    console.log(dssId);
    const _ = await prisma.dssCriteriaAlternative.deleteMany({
      where: { 
        AND: [
          { alternativeId: alternativeId },
          { dssId: dssId },
        ], 
      },
    });
    const status = await prisma.dssAlternative.deleteMany({
      where: {
        AND: [
          { alternativeId: alternativeId },
          { dssId: dssId },
        ],
      }
    });

  return;
};
