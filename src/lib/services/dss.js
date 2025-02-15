import { CriteriaType, DssMethodType } from '@prisma/client';
import prisma from '../prisma';
import { buildCriteriaTree } from './topics.js';

export const createDss = async (topicId) => {
  const creatorId = 1;

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

export const getDss = async () => {
  const dss = await prisma.dss.findMany({
    select: {
      dssId: true,
      topic: {
        select: {
          name: true,
          description: true,
        },
      },
      creator: {
        select: {
          name: true,
        },
      },
    },
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

export const saveDssScore = async (dssId, ranking) => {
    // console.log(dssId);
    // console.log(ranking)
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
              name: true,
            },
          },
          rankValue: true,
          sValue: true,
        },
      },
    },
    where: { dssId: parseInt(dssId) },
  });
  return dss;
};

export const calculateDss = async (dssId, method) => {
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
              type: true,
            },
          },
        },
      },
      dssCriteriaAlternatives: {
        select: {
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
              type: true,
              weight: true,
              parentCriteriaId: true,
            },
          },
          value: true,
        },
      },
    },
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


    let methodResult = []

    if (method == DssMethodType.WP) {
        methodResult = Object.entries(calculateWP(weightMap, alternatives, criterias))   
    } else if (method == DssMethodType.SAW) {
        const normalizedAlternatives = normalizeSawAlternatives(criterias, alternatives);
        methodResult = Object.entries(calculateSAW(weightMap, normalizedAlternatives, criterias))   
    } else if (method == DssMethodType.TOPSIS) {
        methodResult = Object.entries(calculateTopsis(alternatives, criterias)).map(item => item[1])
    };
    const ranking = methodResult
            .map(([alternativeId, score]) => ({ alternativeId: Number(alternativeId), score })) 
            .sort((a, b) => b.score - a.score)
            .map((item, index) => ({ ...item, ranking: index + 1 }));   
    
    // console.log("ranking: ", ranking)
    await saveDssScore(dssId, ranking);
    return;
};

function normalizeSawAlternatives(criteria, alternatives) {
    let minMaxValues = {};

  // Cari nilai min/max sesuai tipe criteria
  criteria.forEach((criterion) => {
    let values = alternatives
      .map((alt) => alt.values[criterion.criteriaId])
      .filter((v) => v !== undefined); // Hapus undefined

    let min = values.length > 0 ? Math.min(...values) : 0;
    let max = values.length > 0 ? Math.max(...values) : 0;

    minMaxValues[criterion.criteriaId] =
      criterion.type === 'BENEFIT' ? max : min;
  });

  // Update nilai di alternatives sesuai dengan min/max yang udah dicari
  alternatives.forEach((alt) => {
    Object.keys(alt.values).forEach((key) => {
      let criteriaId = Number(key); // Key dalam object values itu string, convert ke number
      let normalizer = minMaxValues[criteriaId] || 1; // Pakai 1 biar nggak bagi 0

      if (normalizer !== 0) {
        alt.values[criteriaId] = alt.values[criteriaId] / normalizer;
      }
    });
  });

  return alternatives;
}

function calculateFinalWeights(criteria, parentId = null) {
  const filtered = criteria.filter((c) => c.parentCriteriaId === parentId);
  const totalWeight = filtered.reduce((sum, c) => sum + c.weight, 0);

  return filtered.flatMap((c) => {
    const finalWeight = parseFloat(
      (c.weight * (1 / (totalWeight || 1))).toFixed(3)
    );
    // const finalWeight = parentId ? c.weight * (1 / totalWeight) : c.weight;
    return [
      { ...c, finalWeight },
      ...calculateFinalWeights(criteria, c.criteriaId),
    ];
  });
}

function calculateWP(
  weightMap,
  alternatives,
  criteria,
  parentCriteriaId = null
) {
  // console.log("PARENTID: ", parentCriteriaId)
  const filteredCriteria = criteria.filter(
    (c) => c.parentCriteriaId === parentCriteriaId
  );
  // console.log("filteredCriteria: ", filteredCriteria)
  if (filteredCriteria.length === 0) return {}; // Base case

  let scores = {};

  filteredCriteria.forEach((criterion) => {
    const subScores = calculateWP(
      weightMap,
      alternatives,
      criteria,
      criterion.criteriaId
    );
    //   console.log("subscore:", subScores);
    alternatives.forEach((alt) => {
      // console.log(Object.keys(subScores).length > 0);
      // console.log("subscore dalam alt: ", subScores);
      const subScore =
        Object.keys(subScores).length > 0
          ? Math.pow(
              subScores[alt.alternativeId],
              weightMap[criterion.criteriaId]
            )
          : Math.pow(
              alt.values[criterion.criteriaId] || 1,
              weightMap[criterion.criteriaId] || 0
            );

      // console.log("scores di criteria %s dan alt %d adalah: %d", criterion.criteriaId, alt.alternativeId, subScore )

      scores[alt.alternativeId] = (scores[alt.alternativeId] || 1) * subScore;
    });
  });
  return scores;
}

function calculateSAW(
  weightMap,
  alternatives,
  criteria,
  parentCriteriaId = null
) {
  console.log('PARENTID: ', parentCriteriaId);
  const filteredCriteria = criteria.filter(
    (c) => c.parentCriteriaId === parentCriteriaId
  );
  console.log('filteredCriteria: ', filteredCriteria);
  if (filteredCriteria.length === 0) return {}; // Base case
  let scores = {};

  filteredCriteria.forEach((criterion) => {
    const subScores = calculateSAW(
      weightMap,
      alternatives,
      criteria,
      criterion.criteriaId
    );
    //   console.log("subscore:", subScores);
    alternatives.forEach((alt) => {
      // console.log(Object.keys(subScores).length > 0);
      // console.log("subscore dalam alt: ", subScores);
      const subScore =
        Object.keys(subScores).length > 0
          ? subScores[alt.alternativeId] * weightMap[criterion.criteriaId] // SAW pakai tambah, bukan kali
          : (alt.values[criterion.criteriaId] || 0) *
            weightMap[criterion.criteriaId];

      // console.log("scores di criteria %s dan alt %d adalah: %d", criterion.criteriaId, alt.alternativeId, subScore )

      scores[alt.alternativeId] = (scores[alt.alternativeId] || 0) + subScore;
    });
    // console.log("scores: ",scores)
    // console.log("FINISH PARENTID: ", parentCriteriaId)
    })
    return scores;
}


function calculateAggregatedValues(alternatives, criterias) {
    let criteriaMap = Object.fromEntries(criterias.map(c => [c.criteriaId, { ...c, children: [] }]));

    // Bangun tree kriteria (Hubungkan parent dengan children)
    criterias.forEach(c => {
        if (c.parentCriteriaId !== null) {
            criteriaMap[c.parentCriteriaId].children.push(criteriaMap[c.criteriaId]);
        }
    });

    // Rekursif buat ngitung nilai tiap root criteria
    function aggregateValues(criterion, altValues) {
        if (criterion.children.length === 0) {
            return altValues[criterion.criteriaId] || 0;
        }

        return criterion.children.reduce((sum, child) => {
            return sum + (aggregateValues(child, altValues) * child.weight);
        }, 0);
    }

    return alternatives.map(alt => ({
        alternativeId: alt.alternativeId,
        name: alt.name,
        values: Object.fromEntries(
            Object.values(criteriaMap)
                .filter(c => c.parentCriteriaId === null) // Ambil root criteria aja
                .map(c => [c.criteriaId, aggregateValues(c, alt.values)])
        ),
    }));
}

function calculateTopsis(alternatives, criterias) {
    alternatives = calculateAggregatedValues(alternatives, criterias);

    const criteriaIds = criterias.filter(c => c.parentCriteriaId === null).map(c => c.criteriaId);

    // 1️⃣ Normalisasi Matriks Keputusan
    let sumSquares = {};
    criteriaIds.forEach(cId => {
        sumSquares[cId] = Math.sqrt(
            alternatives.reduce((sum, alt) => sum + Math.pow(alt.values[cId] || 0, 2), 0)
        );
    });

    let normalizedMatrix = alternatives.map(alt => ({
        alternativeId: alt.alternativeId,
        name: alt.name,
        values: Object.fromEntries(
            criteriaIds.map(cId => [cId, (alt.values[cId] || 0) / (sumSquares[cId] || 1)])
        ),
    }));

    // 2️⃣ Normalisasi Bobot (Weighted Normalized Decision Matrix)
    let weightedMatrix = normalizedMatrix.map(alt => ({
        alternativeId: alt.alternativeId,
        name: alt.name,
        values: Object.fromEntries(
            criteriaIds.map(cId => {
                let weight = criterias.find(c => c.criteriaId === cId)?.weight || 0;
                return [cId, alt.values[cId] * weight];
            })
        ),
    }));

    // 3️⃣ Tentuin A⁺ & A⁻
    let idealBest = {}, idealWorst = {};
    criteriaIds.forEach(cId => {
        let isBenefit = criterias.find(c => c.criteriaId === cId)?.type === "BENEFIT";
        let values = weightedMatrix.map(alt => alt.values[cId]);
        idealBest[cId] = isBenefit ? Math.max(...values) : Math.min(...values);
        idealWorst[cId] = isBenefit ? Math.min(...values) : Math.max(...values);
    });

    // 4️⃣ Hitung D⁺ & D⁻
    let scores = weightedMatrix.map(alt => {
        let dPlus = Math.sqrt(
            criteriaIds.reduce((sum, cId) => sum + Math.pow(alt.values[cId] - idealBest[cId], 2), 0)
        );
        let dMinus = Math.sqrt(
            criteriaIds.reduce((sum, cId) => sum + Math.pow(alt.values[cId] - idealWorst[cId], 2), 0)
        );
        return {
            alternativeId: alt.alternativeId,
            name: alt.name,
            score: dMinus / (dPlus + dMinus),
        };
    });

    return scores;
}
