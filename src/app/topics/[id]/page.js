'use client';

import { useRouter } from 'next/navigation';

export default function TopicDetailPage() {
  const router = useRouter();

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-60'>
        <h1 className='text-3xl font-bold'>Memilih Kandidat Beasiswa</h1>
        <p>Memilih kandidat penerima beasiswa LPDP 2025 jalur prestasi</p>
      </div>

      {/* Topic Selection with Criteria Table */}
      <div className='py-8'>
        <div className='w-3/5 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Criteria</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border border-gray-300 px-4 py-2'>
                    Nama Kriteria
                  </th>
                  <th className='border border-gray-300 px-4 py-2'>
                    Deskripsi
                  </th>
                  <th className='border border-gray-300 px-4 py-2'>
                    Tipe Kriteria
                  </th>
                  <th className='border border-gray-300 px-4 py-2'>
                    Bobot Kriteria
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: 'Pengalaman',
                    desc: 'Lama bekerja dalam bidang terkait',
                    type: 'Benefit',
                    weight: 'Tinggi',
                    subcriteria: [
                      {
                        name: '> 5 Tahun',
                        desc: 'Pengalaman lebih dari 5 tahun',
                        type: 'Benefit',
                        weight: 'Tinggi',
                      },
                      {
                        name: '3-5 Tahun',
                        desc: 'Pengalaman antara 3 hingga 5 tahun',
                        type: 'Benefit',
                        weight: 'Sedang',
                      },
                      {
                        name: '< 3 Tahun',
                        desc: 'Pengalaman kurang dari 3 tahun',
                        type: 'Benefit',
                        weight: 'Rendah',
                      },
                    ],
                  },
                  {
                    name: 'Universitas',
                    desc: 'Asal universitas',
                    type: 'Benefit',
                    weight: 'Tinggi',
                    subcriteria: [],
                  },
                  {
                    name: 'IPK',
                    desc: 'Indeks Prestasi Kumulatif akademik',
                    type: 'Benefit',
                    weight: 'Sedang',
                    subcriteria: [
                      {
                        name: '> 3.5',
                        desc: 'IPK lebih dari 3.5',
                        type: 'Benefit',
                        weight: 'Tinggi',
                      },
                      {
                        name: '3.0 - 3.5',
                        desc: 'IPK antara 3.0 dan 3.5',
                        type: 'Benefit',
                        weight: 'Sedang',
                      },
                      {
                        name: '< 3.0',
                        desc: 'IPK kurang dari 3.0',
                        type: 'Benefit',
                        weight: 'Rendah',
                      },
                    ],
                  },
                ].flatMap((criterion, index) => [
                  <tr key={index} className='bg-white text-gray-700'>
                    <td className='border border-gray-300 px-4 py-2 font-semibold'>
                      {criterion.name}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {criterion.desc}
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                      {criterion.type}
                    </td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                      {criterion.weight}
                    </td>
                  </tr>,
                  ...criterion.subcriteria.map((sub, i) => (
                    <tr
                      key={`${index}-${i}`}
                      className='bg-gray-100 text-gray-700'
                    >
                      <td className='border border-gray-300 px-4 py-2 pl-6'>
                        {sub.name}
                      </td>
                      <td className='border border-gray-300 px-4 py-2'>
                        {sub.desc}
                      </td>
                      <td className='border border-gray-300 px-4 py-2 text-center'>
                        {sub.type}
                      </td>
                      <td className='border border-gray-300 px-4 py-2 text-center'>
                        {sub.weight}
                      </td>
                    </tr>
                  )),
                ])}
              </tbody>
            </table>
          </div>

          <div className='flex justify-end space-x-4 my-4'>
            <button
              className='bg-gray-400 text-white px-4 py-2 rounded'
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </button>
            <button
              className='bg-blue-400 text-white px-4 py-2 rounded'
              onClick={() => {
                router.push('/topics/2/update');
              }}
            >
              Update Criteria
            </button>
            <button className='bg-blue-400 text-white px-4 py-2 rounded'>
              Use Criteria
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
