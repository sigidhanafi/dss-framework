import prisma from '../prisma';

export const getTopics = async () => {
  const topics = await prisma.topic.findMany({
      select: {
          topicId: true,
          name: true,
          creator: {
              select: {
                  name: true
              }
          }
      }
  });

  const aliasesTopicList = topics.map(topic => ({
    id: topic.topicId,
    name: topic.name,
    author: topic.creator.name
  }));

  return aliasesTopicList;
};

export const getTopicById = async (id) => {
  const topic = await prisma.topic.findUnique({
    where: { topicId: parseInt(id) },
    select: {
        topicId: true,
        name: true,
        description: true,
        criterias: true
    }
  });

  return topic;
};

export const createTopic = async (name, description) => {
  const creatorId = 1
  
  const topic = await prisma.topic.create({
    data: { name, description, creatorId },
  });
  return topic;
};