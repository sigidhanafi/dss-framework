import prisma from '../prisma';

export const createDss = async (topicId, method) => {

    const creatorId = 1 
  
    const dss = await prisma.dss.create({
        data: { creatorId, topicId, method },
    });
    
    return dss;
};

export const getDssById = async (dssId) => {

    const dss = await prisma.dss.findUnique({
        include: {
            dssAlternatives: true,
        },
        where: { dssId: parseInt(dssId) },
        
    });
  
    return dss;
};