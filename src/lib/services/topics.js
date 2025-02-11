import prisma from '../prisma';

export const getTopics = async () => {
  const topics = await prisma.topic.findMany({
      select: {
          topicId: true,
          name: true,
          user: {
              select: {
                  name: true
              }
          }
      }
  });

  const topicsResponse = topics.map(topic => ({
    id: topic.topicId,
    name: topic.name,
    author: topic.user.name
  }));

  return topicsResponse;
};