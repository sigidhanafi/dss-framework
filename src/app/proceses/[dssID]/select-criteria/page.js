'use client';

import SettingCriteria from '@/components/setting-criteria';
import Stepper from '@/components/stepper';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function SelectCriteria() {
  const router = useRouter();
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

      setTopic({
        name: data.topic.name,
        topicId: data.topic.topicId,
        description: data.topic.description,
      });
    } else {
      // handle error
    }
  };

  const fetchCriteriaByTopic = async () => {
    if (topic == null) {
      return;
    }

    const response = await fetch(
      '/api/topics/' + topic.topicId + '/criterias',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const responseJson = await response.json();
    if (responseJson.status == 200) {
      const criterias = responseJson.data;

      setCriterias(criterias);
    } else {
      // handle error
    }
  };

  const handleSelectCriteria = async () => {
    const params = { name: formTopic.name, description: formTopic.description };
    const response = await fetch('/api/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const responseJson = await response.json();
    if (responseJson.status == 200) {
      setShowForm(false);
      fetchTopics();
    } else {
      // show notif error
    }
  };

  useEffect(() => {
    fetchDetailDss();
  }, []);

  useEffect(() => {
    fetchCriteriaByTopic();
  }, [topic]);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Topic: {topic && topic.name}</h1>
        <p>{topic && topic.description}</p>
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
              router.push('/proceses/' + dssID + '/review-alternative');
            }}
          >
            Review Alternatives
          </button>
        </div>
      </div>
    </>
  );
}
