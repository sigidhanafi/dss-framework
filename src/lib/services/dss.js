import { DssMethodType } from '@prisma/client';
import prisma from '../prisma';
import { buildCriteriaTree } from './topics.js';

export const createDss = async (topicId, method) => {
  const creatorId = 1;

  const dss = await prisma.dss.create({
    data: { creatorId, topicId, method },
  });

  return dss;
};

export const getDetailDss = async (dssId) => {
  const dss = await prisma.dss.findUnique({
    select: {
      dssId: true,
      topic: {
        select: {
          topicId: true,
          name: true,
          description: true,
        },
      },
      method: true,
      creator: {
        select: {
          name: true,
        },
      },
      dssAlternatives: {
        select: {
          dssAlternativeId: true,
          alternative: {
            select: {
              alternativeId: true,
              name: true,
            },
          },
          rankValue: true,
          sValue: true,
        },
      },
      dssCriterias: {
        select: {
          dssCriteriaId: true,
          criteria: {
            select: {
              criteriaId: true,
              name: true,
              description: true,
              type: true,
              weight: true,
              parentCriteriaId: true,
            },
          },
        },
      },
      dssCriteriaAlternatives: {
        select: {
          dssCriteriaAlternativeId: true,
          alternative: {
            select: {
              alternativeId: true,
              name: true,
            },
          },
          criteria: {
            select: {
              criteriaId: true,
              name: true,
            },
          },
          value: true,
        },
      },
    },
    where: { dssId: parseInt(dssId) },
  });

  const criteriaList = dss.dssCriterias.flatMap(Object.values);
  dss.dssCriterias = buildCriteriaTree(criteriaList);
  return dss;
};

export const addCriterias = async (data) => {
  const _ = await prisma.dssCriteriaAlternative.createMany({
    data: data,
  });

  return;
};

export const saveDssResult = async (data) => {
  console.log(data);
  const _ = await prisma.dssAlternative.createMany({
    data: data,
  });

  return;
};
