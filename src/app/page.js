import FromInput from '@/components/form-input';

export default function Home() {
  // const criteria = [
  //   { name: 'C1', weight: 5 },
  //   { name: 'C2', weight: 3 },
  //   { name: 'C3', weight: 4 },
  //   { name: 'C4', weight: 2 },
  // ];

  // const totalWeight = criteria.reduce((total, item) => total + item.weight, 0);

  // const normalitationWeight = criteria.map((item) => {
  //   return {
  //     name: item.name,
  //     weight: (item.weight / totalWeight).toFixed(3),
  //   };
  // });

  // const alternative = [
  //   {
  //     name: 'A1',
  //     scoreCriteria: [{ C1: 70 }, { C2: 50 }, { C3: 80 }, { C4: 60 }],
  //   },
  //   {
  //     name: 'A2',
  //     scoreCriteria: [{ C1: 50 }, { C2: 60 }, { C3: 82 }, { C4: 70 }],
  //   },
  //   {
  //     name: 'A3',
  //     scoreCriteria: [{ C1: 85 }, { C2: 55 }, { C3: 80 }, { C4: 75 }],
  //   },
  //   {
  //     name: 'A4',
  //     scoreCriteria: [{ C1: 82 }, { C2: 70 }, { C3: 65 }, { C4: 85 }],
  //   },
  //   {
  //     name: 'A5',
  //     scoreCriteria: [{ C1: 75 }, { C2: 75 }, { C3: 85 }, { C4: 74 }],
  //   },
  //   {
  //     name: 'A6',
  //     scoreCriteria: [{ C1: 62 }, { C2: 50 }, { C3: 75 }, { C4: 80 }],
  //   },
  // ];

  // const alternativePreference = alternative.map((alternative) => {
  //   var preference = alternative.scoreCriteria
  //     .map((score) => {
  //       const [key, value] = Object.entries(score)[0];

  //       const findWeight = normalitationWeight.find(
  //         (weight) => weight.name === key
  //       );

  //       return value ** findWeight.weight;
  //     })
  //     .reduce((total, num) => total * num, 1)
  //     .toFixed(3);

  //   return {
  //     name: alternative.name,
  //     s: preference,
  //   };
  // });

  // const sumOfPreference = alternativePreference.reduce(
  //   (total, item) => total + Number(item.s),
  //   0
  // );

  // const normalitationPreference = alternativePreference.map((item) => {
  //   return {
  //     name: item.name,
  //     s: (item.s / sumOfPreference).toFixed(3),
  //   };
  // });

  // const alternativeRank = normalitationPreference
  //   .sort((a, b) => b.s - a.s)
  //   .map((item, index) => ({ ...item, rank: index + 1 }));

  // // 📝 Contoh Inputan User (Alternatif & Kriteria Bersarang)
  // const alternatives = [
  //   {
  //     name: 'A1',
  //     scoreCriteria: { 'C1.1': 80, 'C1.2.1': 70, 'C1.2.2': 60, C2: 90 },
  //   },
  //   {
  //     name: 'A2',
  //     scoreCriteria: { 'C1.1': 90, 'C1.2.1': 85, 'C1.2.2': 75, C2: 80 },
  //   },
  //   {
  //     name: 'A3',
  //     scoreCriteria: { 'C1.1': 70, 'C1.2.1': 80, 'C1.2.2': 90, C2: 95 },
  //   },
  // ];

  // const criteria = [
  //   {
  //     name: 'C1',
  //     weight: 0.6,
  //     subCriteria: [
  //       { name: 'C1.1', weight: 0.4 },
  //       {
  //         name: 'C1.2',
  //         weight: 0.6,
  //         subCriteria: [
  //           { name: 'C1.2.1', weight: 0.5 },
  //           { name: 'C1.2.2', weight: 0.5 },
  //         ],
  //       },
  //     ],
  //   },
  //   { name: 'C2', weight: 0.4 }, // Tidak ada sub-kriteria
  // ];

  // function calculateWPM(alternatives, criteria) {
  //   function calculateScore(scoreCriteria, criteriaList) {
  //     return criteriaList.reduce((total, criterion) => {
  //       if (criterion.subCriteria && criterion.subCriteria.length > 0) {
  //         // rekursif jika ada sub-kriteria
  //         const subScore = calculateScore(scoreCriteria, criterion.subCriteria);
  //         return total * subScore ** criterion.weight;
  //       } else {
  //         // kalkulasi langsung jika tidak ada sub-kriteria
  //         const value = scoreCriteria[criterion.name] || 1; // Default 1 jika tidak ada nilai
  //         return total * value ** criterion.weight;
  //       }
  //     }, 1);
  //   }

  //   // return alternatives
  //   //   .map((alternative) => {
  //   //     const score = calculateScore(alternative.scoreCriteria, criteria);
  //   //     return { ...alternative, preferenceScore: score };
  //   //   })
  //   //   .sort((a, b) => b.preferenceScore - a.preferenceScore); // Ranking / urutkan skor tertinggi ke terendah

  //   // 🔥 Hitung skor awal sebelum normalisasi
  //   const scoredAlternatives = alternatives.map((alternative) => ({
  //     ...alternative,
  //     preferenceScore: calculateScore(alternative.scoreCriteria, criteria),
  //   }));

  //   // ✅ Hitung total nilai dari semua preferenceScore
  //   const totalScore = scoredAlternatives.reduce(
  //     (sum, a) => sum + a.preferenceScore,
  //     0
  //   );

  //   // ✅ Normalisasi hasil dengan membagi semua skor dengan `totalScore`
  //   const normalizedAlternatives = scoredAlternatives.map((alternative) => ({
  //     ...alternative,
  //     normalizedScore:
  //       totalScore > 0 ? alternative.preferenceScore / totalScore : 0,
  //   }));

  //   // 🔽 Urutkan berdasarkan skor normalisasi
  //   return normalizedAlternatives.sort(
  //     (a, b) => b.normalizedScore - a.normalizedScore
  //   );
  // }

  // const alternatives = [
  //   {
  //     name: 'A1',
  //     scoreCriteria: { C1: 70, C2: 50, C3: 80, C4: 60 },
  //   },
  //   {
  //     name: 'A2',
  //     scoreCriteria: { C1: 50, C2: 60, C3: 82, C4: 70 },
  //   },
  //   {
  //     name: 'A3',
  //     scoreCriteria: { C1: 85, C2: 55, C3: 80, C4: 75 },
  //   },
  //   {
  //     name: 'A4',
  //     scoreCriteria: { C1: 82, C2: 70, C3: 65, C4: 85 },
  //   },
  //   {
  //     name: 'A5',
  //     scoreCriteria: { C1: 75, C2: 75, C3: 85, C4: 74 },
  //   },
  //   {
  //     name: 'A6',
  //     scoreCriteria: { C1: 62, C2: 50, C3: 75, C4: 80 },
  //   },
  // ];

  // function normalizeWeight(criteria) {
  //   // Hitung total bobot dari semua kriteria utama
  //   const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0);

  //   // Rekursif untuk normalisasi
  //   function normalize(criteriaList, parentWeight = 1) {
  //     return criteriaList.map((item) => {
  //       // Hitung bobot normalisasi
  //       const normalizedWeight = (item.weight / totalWeight) * parentWeight;

  //       // Jika ada sub-kriteria, normalisasi juga secara rekursif
  //       const normalizedSubCriteria =
  //         item.subCriteria.length > 0
  //           ? normalize(item.subCriteria, normalizedWeight)
  //           : [];

  //       return {
  //         ...item,
  //         weight: normalizedWeight,
  //         subCriteria: normalizedSubCriteria,
  //       };
  //     });
  //   }

  //   return normalize(criteria);
  // }

  // // Contoh Data Kriteria (Tanpa Sub-Kriteria)
  // const criteria = [
  //   { name: 'C1', weight: 5, subCriteria: [] },
  //   { name: 'C2', weight: 3, subCriteria: [] },
  //   { name: 'C3', weight: 4, subCriteria: [] },
  //   { name: 'C4', weight: 2, subCriteria: [] },
  // ];

  // // 🔥 Normalisasi Weight
  // const normalizedCriteria = normalizeWeight(criteria);
  // console.log(normalizedCriteria);

  // // 🔥 Hitung Ranking dengan WPM
  // const rankedAlternatives = calculateWPM(alternatives, normalizedCriteria);
  // console.log(rankedAlternatives);

  console.log('holaaa');

  return (
    <>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          {/* Your content */}

          <FromInput />
        </div>
      </main>
    </>
  );
}
