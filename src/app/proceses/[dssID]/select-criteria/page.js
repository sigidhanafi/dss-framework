'use client';

import SettingCriteria from '@/components/setting-criteria';
import Stepper from '@/components/stepper';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function SelectCriteria() {
  const { dssID } = useParams();
  const [topic, setTopic] = useState(null);
  const [criterias, setCriterias] = useState([]);

  const step = 1;

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

  const fetchTopicDetail = async () => {
    if (topic == null) {
      return;
    }

    const response = await fetch('/api/topics/' + topic.topicId, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();
    if (responseJson.status == 200) {
      const data = responseJson.data;

      setCriterias(data.criterias);
    } else {
      // handle error
    }
  };

  useEffect(() => {
    fetchDetailDss();
  }, []);

  useEffect(() => {
    fetchTopicDetail();
  }, [topic]);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Topic: Memilih Kandidat Beasiswa</h1>
        <p>Memilih kandidat penerima beasiswa LPDP 2025 jalur prestasi</p>
      </div>

      <Stepper step={1} />

      {topic && criterias && (
        <SettingCriteria
          title={'Setting Criteria'}
          criteria={criterias}
          action={'process'}
          topicId={topic.topicId}
        />
      )}
    </>
  );
}
