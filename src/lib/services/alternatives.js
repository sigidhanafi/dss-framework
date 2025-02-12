import prisma from '../prisma';

export const createAlternative = async (dssId, alternativeName, description) => {
    
    const alternative = await prisma.dssAlternative.create({
        data: { dssId, alternativeName, description },
    });
    
    return alternative;
};

export const getAlternatives = async (q={}) => {
    console.log(q);
    const alternatives = await prisma.dssAlternative.findMany({
      where: q,
      select: {
        dssAlternativeId: true,
        alternativeName: true,
        description: true
      }
    });
  
    return alternatives;
  };

export const getOneAlternative = async (q={}) => {
    const alternative = await prisma.dssAlternative.findUnique({
      where: q,
      select: {
        dssAlternativeId: true,
        alternativeName: true,
        description: true
      }
    });
  
    return alternative;
  };

export const updateAlternative = async (alternativeId, data) => {
  
    const criteria = await prisma.dssAlternative.update({
        where: { dssAlternativeId: parseInt(alternativeId) },
        data: data,
    });
    
    return criteria;
};


export const deleteAlternative = async (alternativeId) => {
  
    const _ = await prisma.dssAlternative.delete({
        where: { dssAlternativeId: parseInt(alternativeId) }
    });
    
    return;
};
