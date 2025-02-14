'use client';

import SettingAlternative from '@/components/setting-alternative';
import SettingCriteria from '@/components/setting-criteria';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function CriteriaUpdate() {
  const router = useRouter();
  const { id: topicId } = useParams();

  const [topic, setTopic] = useState({ id: '', name: '', description: '' });
  const [criterias, setCriterias] = useState([]);
  const [alternatives, setAlternatives] = useState([]);

  const fetchTopicDetail = async () => {
    const response = await fetch('/api/topics/' + topicId, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();

    console.log(responseJson.data);

    if (responseJson.status == 200) {
      const data = responseJson.data;

      setTopic({ id: data.id, name: data.name, description: data.description });
      setCriterias(data.criterias);
      setAlternatives(data.alternatives);
    } else {
      // handle error
    }
  };

  useEffect(() => {
    fetchTopicDetail();
  }, []);

  // const criteria = [
  //   {
  //     name: 'Pengalaman',
  //     desc: 'Lama bekerja dalam bidang terkait',
  //     type: 'Benefit',
  //     weight: 'Tinggi',
  //     subcriteria: [
  //       {
  //         name: '> 5 Tahun',
  //         desc: 'Pengalaman lebih dari 5 tahun',
  //         type: 'Benefit',
  //         weight: 'Tinggi',
  //         subcriteria: [
  //           {
  //             name: 'Sub Sub Criteria',
  //             desc: 'Sub Sub Sub',
  //             type: 'Benefit',
  //             weight: 'Tinggi',
  //             subcriteria: [
  //               {
  //                 name: 'Sub Sub Sub Criteria',
  //                 desc: 'Sub Sub Sub Sub',
  //                 type: 'Benefit',
  //                 weight: 'Tinggi',
  //                 subcriteria: [],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         name: '3-5 Tahun',
  //         desc: 'Pengalaman antara 3 hingga 5 tahun',
  //         type: 'Benefit',
  //         weight: 'Sedang',
  //       },
  //       {
  //         name: '< 3 Tahun',
  //         desc: 'Pengalaman kurang dari 3 tahun',
  //         type: 'Benefit',
  //         weight: 'Rendah',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Universitas',
  //     desc: 'Asal universitas',
  //     type: 'Benefit',
  //     weight: 'Tinggi',
  //     subcriteria: [],
  //   },
  //   {
  //     name: 'IPK',
  //     desc: 'Indeks Prestasi Kumulatif akademik',
  //     type: 'Benefit',
  //     weight: 'Sedang',
  //     subcriteria: [
  //       {
  //         name: '> 3.5',
  //         desc: 'IPK lebih dari 3.5',
  //         type: 'Benefit',
  //         weight: 'Tinggi',
  //       },
  //       {
  //         name: '3.0 - 3.5',
  //         desc: 'IPK antara 3.0 dan 3.5',
  //         type: 'Benefit',
  //         weight: 'Sedang',
  //       },
  //       {
  //         name: '< 3.0',
  //         desc: 'IPK kurang dari 3.0',
  //         type: 'Benefit',
  //         weight: 'Rendah',
  //       },
  //     ],
  //   },
  // ];

  // const alternatives = [
  //   { name: 'Sigit' },
  //   { name: 'Silmi' },
  //   { name: 'Alfy' },
  //   { name: 'Rafa' },
  // ];

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>
          Manage Topic: Memilih Kandidat Beasiswa
        </h1>
        <p>Memilih kandidat penerima beasiswa LPDP 2025 jalur prestasi</p>
      </div>

      <SettingCriteria
        title={'Manage Criteria'}
        criteria={criterias}
        topicId={topicId}
        action={'setting'}
        refetchTrigger={fetchTopicDetail}
      />

      <SettingAlternative
        title={'Manage Alternatives'}
        alternatives={alternatives}
        action={'setting'}
        topicId={topicId}
        refetchTrigger={fetchTopicDetail}
      />

      {/* Action */}
      <div className='w-3/5 mx-auto my-10'>
        <div className='flex justify-end space-x-4 my-4'>
          <button
            className='bg-gray-200 text-gray-500 px-4 py-2 rounded hover:bg-gray-300'
            onClick={() => {
              router.back();
            }}
          >
            Back
          </button>
          <button
            className='bg-blue-400 text-white px-4 py-2 rounded'
            onClick={() => {
              router.back();
            }}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
