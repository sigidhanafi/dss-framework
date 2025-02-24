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
  const [dssCriterias, setDssCriterias] = useState([]);

  const step = 1;

  const flattenCriteriaIds = (criterias) => {
    let ids = [];

    criterias.forEach((criteria) => {
      ids.push(criteria.criteriaId);
      if (criteria.subCriteria && criteria.subCriteria.length > 0) {
        ids = ids.concat(flattenCriteriaIds(criteria.subCriteria));
      }
    });

    return ids;
  };

  const fetchDetailDss = async () => {
    const response = await fetch('/api/dss/' + dssID, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    if (responseJson.status == 200) {
      const data = responseJson.data;

      const dssCriteriaId = flattenCriteriaIds(data.dssCriterias);
      setDssCriterias(dssCriteriaId);

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

  useEffect(() => {
    fetchDetailDss();
  }, []);

  useEffect(() => {
    fetchCriteriaByTopic();
  }, [topic]);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20 mx-4'>
        <h1 className='text-3xl font-bold'>Topic: {topic && topic.name}</h1>
        <p>{topic && topic.description}</p>
      </div>

      <Stepper step={1} />

      {topic && criterias && (
        <SettingCriteria
          title={'Setting Criteria'}
          criteria={criterias}
          dssCriterias={dssCriterias}
          action={'process'}
          topicId={topic.topicId}
          dssID={dssID}
        />
      )}

      <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto'>
        <div className='flex justify-end space-x-4 my-4'>
          <button
            className='bg-gray-200 text-gray-500 px-4 py-2 rounded hover:bg-gray-300'
            onClick={() => {
              router.back();
            }}
          >
            Back
          </button>
          {topic && (
            <button
              className='bg-blue-400 text-white px-4 py-2 rounded'
              onClick={() => {
                router.push('/topics/' + topic.topicId + '/update');
              }}
            >
              Setting Criteria
            </button>
          )}
          <button
            className='bg-blue-400 text-white px-4 py-2 rounded'
            onClick={() => {
              router.push('/proceses/' + dssID + '/review-alternative');
            }}
          >
            Setting Alternatives
          </button>
        </div>
      </div>
    </>
  );
}
