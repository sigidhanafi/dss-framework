import prisma from '../prisma';

export const getTopics = async () => {
  const topics = await prisma.topic.findMany({
    select: {
      topicId: true,
      name: true,
      creator: {
        select: {
          name: true,
        },
      },
    },
  });

  const aliasesTopicList = topics.map((topic) => ({
    id: topic.topicId,
    name: topic.name,
    author: topic.creator.name,
  }));

  return aliasesTopicList;
};

export const getTopicDetail = async (id) => {
  const topic = await prisma.topic.findUnique({
    where: { topicId: parseInt(id) },
    select: {
      topicId: true,
      name: true,
      description: true,
      alternatives: {
        select: {
          alternativeId: true,
          name: true,
          description: true,
        },
      },
    },
  });
  const flatCriteriaList = await prisma.criteria.findMany({
    where: { topicId: parseInt(id) },
    select: {
      criteriaId: true,
      name: true,
      description: true,
      type: true,
      weight: true,
      parentCriteriaId: true,
    },
  });

  const criteriaTree = buildCriteriaTree(flatCriteriaList);

  const res = {
    topicId: topic.topicId,
    name: topic.name,
    description: topic.description,
    criterias: criteriaTree,
    alternatives: topic.alternatives,
  };
  return res;
};

export const createTopic = async (name, description) => {
  const creatorId = 1;

  const topic = await prisma.topic.create({
    data: { name, description, creatorId },
  });
  return topic;
};

export const getTopicCriterias = async (q) => {
  const criterias = await prisma.criteria.findMany({
    where: q,
    select: {
      criteriaId: true,
      name: true,
      description: true,
      type: true,
      weight: true,
      parentCriteriaId: true,
    },
  });

  const criteriaTree = buildCriteriaTree(criterias);
  return criteriaTree;
};

export function buildCriteriaTree(criteriaList, parentId = null) {
  return criteriaList
    .filter((item) => item.parentCriteriaId === parentId)
    .map((item) => ({
      ...item,
      subCriteria: buildCriteriaTree(criteriaList, item.criteriaId),
    }));
}
