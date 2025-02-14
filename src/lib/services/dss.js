import { DssMethodType } from '@prisma/client';
import prisma from '../prisma';
import { buildCriteriaTree } from './topics.js';


export const createDss = async (topicId, method) => {

    const creatorId = 1 
  
    const dss = await prisma.dss.create({
        data: { creatorId, topicId },
    });
    
    return dss;
};

export const updateDssMethod = async (dssId, method) => {
  
    const dss = await prisma.dss.updateMany({
        where: { dssId: dssId },
        data: { method: method },
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
                    name: true
                }
            },
            method: true,
            creator: {
                select: {
                    name: true
                }
            },
            dssAlternatives: {
                select: {
                    dssAlternativeId: true,
                    alternative: {
                        select: {
                            alternativeId: true,
                            name: true
                        }
                    },
                    rankValue: true,
                    sValue: true
                }
            },
            dssCriterias: { 
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
                    }
                }
            },
            dssCriteriaAlternatives: {
                select: {
                    dssCriteriaAlternativeId: true,
                    alternative: {
                        select: {
                            alternativeId: true,
                            name: true
                        }
                    },
                    criteria: {
                        select: {
                            criteriaId: true,
                            name: true
                        }
                    },
                    value: true,
                }
            }
        },
        where: { dssId: parseInt(dssId) },   
    });

    const criteriaList = dss.dssCriterias.flatMap(Object.values);    
    dss.dssCriterias = buildCriteriaTree(criteriaList)
    return dss;
};


export const addCriterias = async (data) => {
    const _ = await prisma.dssCriteriaAlternative.createMany({
        data: data,
    });
    
    return;
};

export const saveDssScore = async (dssId, ranking) => {
    console.log(dssId);
    console.log(ranking)
    await Promise.all(
        ranking.map((data) =>
          prisma.dssAlternative.updateMany({
            where: {dssId: dssId, alternativeId: data.alternativeId},
            data: { sValue: data.score, rankValue: data.ranking }
          })
        )
      );
    return;
};

export const getDssResult = async (dssId) => {
    const dss = await prisma.dss.findUnique({
        select: {
            dssId: true,
            dssAlternatives: {
                select: {
                    dssAlternativeId: true,
                    alternative: {
                        select: {
                            alternativeId: true,
                            name: true
                        }
                    },
                    rankValue: true,
                    sValue: true
                }
            }
        },
        where: { dssId: parseInt(dssId) },   
    });
    return dss;
};


export const calculateDss = async (dssId, method) => {
    // const _ = await prisma.dssAlternative.createMany({
    //     data: data
    // });

    const dss = await prisma.dss.findUnique({
        where: { dssId: dssId },
        select: {
            dssId: true,
            dssCriterias: {
                select: {
                    criteria: {
                        select: {
                            criteriaId: true,
                            name: true,
                            weight: true, 
                            parentCriteriaId: true,
                            type: true
                        }
                    },
                }
            },
            dssCriteriaAlternatives: {
                select: {
                    alternative: {
                        select: {
                            alternativeId: true,
                            name: true
                        }
                    },
                    criteria: {
                        select: {
                            criteriaId: true,
                            name: true,
                            type: true,
                            weight: true,
                            parentCriteriaId: true
                        }
                    },
                    value: true,
                }
            }
        }
    });

    let criterias = dss.dssCriterias.flatMap(Object.values);   
    const weightedCriteria = calculateFinalWeights(criterias);
    const weightMap = Object.fromEntries(
        weightedCriteria.map((c) => [c.criteriaId, c.finalWeight])
      );
    let alternatives = dss.dssCriteriaAlternatives

    alternatives = Object.values(alternatives.reduce((acc, { alternative, criteria, value }) => {
        const { alternativeId, name } = alternative;
        if (!acc[alternativeId]) {
          acc[alternativeId] = { alternativeId, name, values: {} };
        }
        acc[alternativeId].values[criteria.criteriaId] = value;
        return acc;
      }, {}));     

    let ranking = []

    if (method == DssMethodType.WP) {
        ranking = Object.entries(calculateWP(weightMap, alternatives, criterias))
                .map(([alternativeId, score]) => ({ alternativeId: Number(alternativeId), score })) 
                .sort((a, b) => b.score - a.score)
                .map((item, index) => ({ ...item, ranking: index + 1 }));     
    } else if (method == DssMethodType.SAW) {
        // METODE SAW
    } else if (method == DssMethodType.TOPSIS) {
        // METODE TOPSIS
    };
    
    await saveDssScore(dssId, ranking);
    return;
};

  function calculateFinalWeights(criteria, parentId = null) {
    const filtered = criteria.filter((c) => c.parentCriteriaId === parentId);
    const totalWeight = filtered.reduce((sum, c) => sum + c.weight, 0);
    
    return filtered.flatMap((c) => {
        const finalWeight = parseFloat((c.weight * (1 / (totalWeight || 1))).toFixed(3));
        // const finalWeight = parentId ? c.weight * (1 / totalWeight) : c.weight;
        return [{ ...c, finalWeight }, ...calculateFinalWeights(criteria, c.criteriaId)];
    });
  }

function calculateWP(weightMap, alternatives, criteria, parentCriteriaId = null) {
        // console.log("PARENTID: ", parentCriteriaId)
        const filteredCriteria = criteria.filter((c) => c.parentCriteriaId === parentCriteriaId);
        // console.log("filteredCriteria: ", filteredCriteria)
        if (filteredCriteria.length === 0) return {}; // Base case
      
        let scores = {};
      
        filteredCriteria.forEach((criterion) => {
          const subScores = calculateWP(weightMap, alternatives, criteria, criterion.criteriaId);
        //   console.log("subscore:", subScores);
          alternatives.forEach((alt) => {
            // console.log(Object.keys(subScores).length > 0);
            // console.log("subscore dalam alt: ", subScores);
            const subScore = Object.keys(subScores).length > 0
              ? Math.pow(subScores[alt.alternativeId], weightMap[criterion.criteriaId])
              : Math.pow(alt.values[criterion.criteriaId] || 1, weightMap[criterion.criteriaId] || 0);
            
            // console.log("scores di criteria %s dan alt %d adalah: %d", criterion.criteriaId, alt.alternativeId, subScore )

            scores[alt.alternativeId] = (scores[alt.alternativeId] || 1) * subScore;
          });
        });

    // console.log("scores: ",scores)
    // console.log("FINISH PARENTID: ", parentCriteriaId)
    return scores;
};