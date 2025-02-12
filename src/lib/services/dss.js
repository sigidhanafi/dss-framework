import prisma from '../prisma';

export const createDss = async (topicId, method) => {

    const creatorId = 1 
  
    const dss = await prisma.dss.create({
        data: { creatorId, topicId, method },
    });
    
    return dss;
};

export const getDetailDss = async (dssId) => {

    const dss = await prisma.dss.findUnique({
        include: {
            dssAlternatives: {
                select: {
                    dssAlternativeId: true,
                    alternativeName: true,
                    description: true
                }
            },
        }, 
        where: { dssId: parseInt(dssId) },
            
    });
    return dss;
};


export const addCriterias = async (data) => {

    const _ = await prisma.dssCriteria.createMany({
        data: data,
    });
    
    return;
};

export const saveDssResult = async (data) => {
    await prisma.$transaction(
        data.map((v) =>
          prisma.dssAlternative.update({
            where: { dssAlternativeId: v.dssAlternativeId },
            data: { sValue: v.sValue, rankValue: v.rankValue },
          })
        )
      );
      
    return;
};