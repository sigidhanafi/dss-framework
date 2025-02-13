'use client';

import ProblemInput from './problem-input';
import CriteriaInput from './criteria-input';
import ModelSelect from './model-select';
import AlternativeInput from './alternative-input';

export default function FromInput() {
  function calculateWP(alternatives, criteria) {
    function calculateScore(scoreCriteria, criteriaList) {
      return criteriaList.reduce((total, criterion) => {
        if (criterion.subCriteria && criterion.subCriteria.length > 0) {
          // rekursif jika ada sub-kriteria
          const subScore = calculateScore(scoreCriteria, criterion.subCriteria);
          return total * subScore ** criterion.weight;
        } else {
          // kalkulasi langsung jika tidak ada sub-kriteria
          const value = scoreCriteria[criterion.name] || 1; // Default 1 jika tidak ada nilai
          return total * value ** criterion.weight;
        }
      }, 1);
    }

    // Hitung skor awal sebelum normalisasi
    const scoredAlternatives = alternatives.map((alternative) => ({
      ...alternative,
      preferenceScore: calculateScore(alternative.scoreCriteria, criteria),
    }));

    // Hitung total nilai dari semua preferenceScore
    const totalScore = scoredAlternatives.reduce(
      (sum, a) => sum + a.preferenceScore,
      0
    );

    // Normalisasi hasil dengan membagi semua skor dengan `totalScore`
    const normalizedAlternatives = scoredAlternatives.map((alternative) => ({
      ...alternative,
      normalizedScore:
        totalScore > 0 ? alternative.preferenceScore / totalScore : 0,
    }));

    // Ranking berdasarkan skor normalisasi
    return normalizedAlternatives.sort(
      (a, b) => b.normalizedScore - a.normalizedScore
    );
  }

  function normalizeWeightWP(criteria) {
    // Rekursif untuk normalisasi
    function normalize(criteriaList, parentWeight = 1) {
      // Hitung total bobot dari semua kriteria
      const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0);

      return criteriaList.map((item) => {
        // Hitung bobot normalisasi
        const normalizedWeight = (item.weight / totalWeight) * parentWeight;

        // Jika ada sub-kriteria, normalisasi juga secara rekursif
        const normalizedSubCriteria =
          item.subCriteria.length > 0
            ? normalize(item.subCriteria, normalizedWeight)
            : [];

        return {
          ...item,
          weight: normalizedWeight,
          subCriteria: normalizedSubCriteria,
        };
      });
    }

    return normalize(criteria);
  }

  const alternatives = [
    {
      name: 'A1',
      scoreCriteria: { C1: 70, C2: 50, C3: 80, C4: 60 },
    },
    {
      name: 'A2',
      scoreCriteria: { C1: 50, C2: 60, C3: 82, C4: 70 },
    },
    {
      name: 'A3',
      scoreCriteria: { C1: 85, C2: 55, C3: 80, C4: 75 },
    },
    {
      name: 'A4',
      scoreCriteria: { C1: 82, C2: 70, C3: 65, C4: 85 },
    },
    {
      name: 'A5',
      scoreCriteria: { C1: 75, C2: 75, C3: 85, C4: 74 },
    },
    {
      name: 'A6',
      scoreCriteria: { C1: 62, C2: 50, C3: 75, C4: 80 },
    },
  ];

  // Contoh Data Kriteria (Tanpa Sub-Kriteria)
  const criteria = [
    { name: 'C1', weight: 5, subCriteria: [] },
    { name: 'C2', weight: 3, subCriteria: [] },
    { name: 'C3', weight: 4, subCriteria: [] },
    { name: 'C4', weight: 2, subCriteria: [] },
  ];

  const handleOnProcess = (alternatives, criteria) => {
    // Caclulate with WP
    // Normalisasi Weight
    const normalizedCriteria = normalizeWeightWP(criteria);
    console.log(normalizedCriteria);

    // Hitung Ranking dengan WP
    const rankedAlternatives = calculateWP(alternatives, normalizedCriteria);
    console.log(rankedAlternatives);
  };

  return (
    <>
      <h2 className='text-base/7 font-semibold text-gray-900'>DSS Problem</h2>
      <p className='mt-1 text-sm/6 text-gray-600'>
        Input DSS Problem. Make sure you have the list of criterias and the list
        of alternatives.
      </p>

      <ProblemInput />

      <CriteriaInput />

      <ModelSelect />

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          className='bg-gray-200 text-gray-500 px-4 py-2 rounded hover:bg-gray-300'
        >
          Cancel
        </button>
        <button
          type='button'
          className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
          onClick={() => handleOnProcess(alternatives, criteria)}
        >
          Save
        </button>
      </div>
    </>
  );
}
