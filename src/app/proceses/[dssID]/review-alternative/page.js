'use client';

import SettingAlternative from '@/components/setting-alternative';
import SettingCriteria from '@/components/setting-criteria';
import Stepper from '@/components/stepper';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ReviewAlternativePage() {
  const router = useRouter();
  const { dssID } = useParams();

  const [topic, setTopic] = useState(null);
  const [alternatives, setAlternatives] = useState([]);

  const fetchDetailDss = async () => {
    const response = await fetch('/api/dss/' + dssID, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    if (responseJson.status == 200) {
      const data = responseJson.data;
      // setTopic({ id: data.id, name: data.name, description: data.description });
      // setCriterias(data.criterias);
      // setAlternatives(data.alternatives);

      setTopic({ name: data.topic.name, topicId: data.topic.topicId });
    } else {
      // handle error
    }
  };

  const fetchAlternativeByTopic = async () => {
    if (topic == null) {
      return;
    }

    const response = await fetch(
      '/api/topics/' + topic.topicId + '/alternatives',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status == 200) {
      const data = responseJson.data;

      setAlternatives(data);
    } else {
      // handle error
    }
  };

  useEffect(() => {
    fetchDetailDss();
  }, []);

  useEffect(() => {
    fetchAlternativeByTopic();
  }, [topic]);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>
          Input Alternative: Memilih Kandidat Beasiswa
        </h1>
        <p>Memilih kandidat penerima beasiswa LPDP 2025 jalur prestasi</p>
      </div>

      <Stepper step={2} />
      {alternatives && topic && (
        <SettingAlternative
          title={'Alternatives'}
          alternatives={alternatives}
          action={'process'}
          topicId={topic.topicId}
          refetchTrigger={fetchAlternativeByTopic}
        />
      )}

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
            className='bg-blue-400 text-white px-4 py-2 rounded'
            onClick={() => {
              router.push('/proceses/2/alternative-value');
            }}
          >
            Review Process
          </button>
        </div>
      </div>
    </>
  );
}
