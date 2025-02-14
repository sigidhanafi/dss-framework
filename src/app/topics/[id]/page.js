'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SettingAlternative from '@/components/setting-alternative';
import SettingCriteria from '@/components/setting-criteria';

export default function TopicDetailPage() {
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
    // setTopics(responseJson.data);
    // setLoadingPage(false);

    if (responseJson.status == 200) {
      const data = responseJson.data;

      setTopic({ id: data.id, name: data.name, description: data.description });
      setCriterias(data.criterias);
      setAlternatives(data.alternatives);
    }

    // setTopic(response)
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

  const renderCriteria = (data, level = 0) => {
    return data.map((crit, index) => {
      return (
        <React.Fragment key={index + level}>
          <tr key={index + level} className='bg-white text-gray-700'>
            <td className='border border-gray-300 flex-grow min-w-60'>
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
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Topic: Memilih Kandidat Beasiswa</h1>
        <p>Memilih kandidat penerima beasiswa LPDP 2025 jalur prestasi</p>
      </div>

      {/* Topic Selection with Criteria Table */}
      <SettingCriteria
        title={'Criterias'}
        criteria={criterias}
        topicId={topicId}
        action={'none'}
      />

      {/* Alternative Section */}
      <SettingAlternative
        title={'Alternatives'}
        alternatives={alternatives}
        topicId={topicId}
        action={'none'}
      />

      {/* Action */}
      <div className='w-3/5 mx-auto'>
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
            className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
            onClick={() => {
              router.push('/topics/' + topicId + '/update');
            }}
          >
            Manage
          </button>
          <button
            className='bg-blue-400 text-white px-4 py-2 rounded'
            onClick={() => {
              router.push('/proceses/' + topicId + '/select-criteria');
            }}
          >
            Choose Topic
          </button>
        </div>
      </div>
    </>
  );
}
