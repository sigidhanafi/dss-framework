'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CriteriaUpdate() {
  const [isShowFormCriteria, setShowFormCriteria] = useState(false);

  const router = useRouter();

  const criteria = [
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
          subcriteria: [
            {
              name: 'Sub Sub Criteria',
              desc: 'Sub Sub Sub',
              type: 'Benefit',
              weight: 'Tinggi',
            },
          ],
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
  ];

  var setSubCriterion = () => {};

  const renderCriteria = (data, level = 0) => {
    return data.map((crit, index) => {
      return (
        <React.Fragment key={index + level}>
          <tr key={index + level} className='bg-white text-gray-700'>
            <td className='border border-gray-300 flex-grow'>
              <div className='flex flex-row items-center'>
                <div className={'flex bg-gray-300 h-1 w-' + level + '/5'}></div>
                <p className='px-4'>{crit.name}</p>
              </div>
            </td>
            <td className='border border-gray-300 px-4 py-2 flex-grow-0'>
              {crit.desc}
            </td>
            <td className='border border-gray-300 px-4 py-2 text-center'>
              {crit.type}
            </td>
            <td className='border border-gray-300 px-4 py-2 text-center'>
              {crit.weight}
            </td>
            <td className='border border-gray-300'>
              <div className='flex px-4 py-2 text-center justify-between'>
                <button
                  className='text-blue-500 hover:text-blue-700'
                  onClick={() => {
                    setShowFormCriteria(!isShowFormCriteria);
                  }}
                >
                  edit
                </button>
                <button className='text-blue-500 hover:text-blue-700'>
                  add subcriteria
                </button>
              </div>
            </td>
          </tr>
          {crit.subcriteria &&
            crit.subcriteria.length > 0 &&
            renderCriteria(crit.subcriteria, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-60'>
        <h1 className='text-3xl font-bold'>Memilih Kandidat Beasiswa</h1>
        <p>Memilih kandidat penerima beasiswa LPDP 2025 jalur prestasi</p>
      </div>

      {/* Form to Add Criteria */}
      {isShowFormCriteria && (
        <div className='w-3/5 mx-auto mt-20'>
          <h2 className='text-xl font-semibold mb-4'>Update Criteria</h2>
          <input
            className='border p-2 w-full mb-2'
            placeholder='Nama Kriteria'
            value={''}
            onChange={(e) => {}}
          />
          <input
            className='border p-2 w-full mb-2'
            placeholder='Deskripsi'
            value={''}
            onChange={(e) => {}}
          />
          <select
            className='border p-2 w-full mb-2'
            value={''}
            onChange={(e) => {}}
          >
            <option value='Benefit'>Benefit</option>
            <option value='Cost'>Cost</option>
          </select>
          <select
            className='border p-2 w-full mb-2'
            value={''}
            onChange={(e) => {}}
            placeholder={'Bobot'}
          >
            <option value='tinggi'>Tinggi</option>
            <option value='sedang'>Sedang</option>
            <option value='rendah'>Rendah</option>
          </select>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            onClick={() => {
              setShowFormCriteria(!isShowFormCriteria);
            }}
          >
            Save Criteria
          </button>
        </div>
      )}

      {/* Topic Selection with Criteria Table */}
      <div className='py-8'>
        <div className='w-3/5 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Update Criteria</h2>
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
                  <th className='border border-gray-300 px-4 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>{renderCriteria(criteria)}</tbody>
            </table>
          </div>

          <div className='flex justify-end space-x-4 my-4'>
            <button
              className='bg-blue-400 text-white px-4 py-2 rounded'
              onClick={() => {
                router.back();
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
