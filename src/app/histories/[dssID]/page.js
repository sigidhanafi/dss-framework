'use client';

import AlternativeValue from '@/components/alternative-value';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DssDetailPage() {
  const router = useRouter();

  const { dssID } = useParams();

  const [topic, setTopic] = useState(null);
  const [dssAlternatives, setDssAlternatives] = useState([]);
  const [dssCriterias, setDssCriterias] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState();
  const [criteriaParams, setCriteriaParams] = useState([]);

  const constructCriteriaAndAlternativeData = (criterias, alternatives) => {
    return criterias.map((criteria) => {
      // If subCriteria exists, modify it recursively
      if (criteria.subCriteria && criteria.subCriteria.length > 0) {
        criteria.subCriteria = constructCriteriaAndAlternativeData(
          criteria.subCriteria,
          alternatives
        );
      }

      // Add new data to the subCriteria array
      if (criteria.subCriteria) {
        criteria = { ...criteria, alternatives: alternatives };
      }

      return criteria;
    });
  };

  const fetchDetailDss = async () => {
    const response = await fetch('/api/dss/' + dssID, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();

    if (responseJson.status == 200) {
      const data = responseJson.data;

      console.log('data', data);
      setDssAlternatives(data.dssAlternatives);

      setSelectedMethod(data.method);

      const dssCriterias = constructCriteriaAndAlternativeData(
        data.dssCriterias,
        data.dssAlternatives
      );
      setDssCriterias(dssCriterias);

      setTopic({
        name: data.topic.name,
        topicId: data.topic.topicId,
        description: data.topic.description,
      });
    } else {
      // handle error
    }
  };

  const handleCalculate = () => {
    const params = {
      method: selectedMethod,
      criterias: criteriaParams,
    };

    router.push('/proceses/' + dssID + '/alternative-rank');
  };

  useEffect(() => {
    fetchDetailDss();
  }, []);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>
          Select Method: {topic && topic.name}
        </h1>
        <p>{topic && topic.description}</p>
      </div>

      <AlternativeValue
        alternatives={dssAlternatives}
        criteriaAlternativeValue={dssCriterias}
        updateParamToParent={(params) => {}}
      />

      {/* Method Selection Section */}
      <div className='w-3/5 mx-auto mt-10'>
        <h2 className='text-lg font-semibold mb-4'>Selected Method</h2>
        <div className='grid grid-cols-3 gap-6'>
          <div
            className={`border p-4 rounded shadow-sm text-center flex items-center justify-between`}
          >
            <div className='flex-grow'>
              <h3 className='text-lg font-semibold'>WP</h3>
              <p className='text-gray-600'>
                Metode WP untuk pengambilan keputusan
              </p>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='green'
              className='size-6'
            >
              <path
                fillRule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </div>

      <div className='w-3/5 mx-auto my-10'>
        <h2 className='text-xl font-semibold mb-4'>Alternative Rank</h2>
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2'>Alternative</th>
              <th className='border border-gray-300 p-2'>Score</th>
              <th className='border border-gray-300 p-2'>Rank</th>
            </tr>
          </thead>
          <tbody>
            {dssAlternatives.map((item, index) => (
              <tr key={index} className='text-center'>
                <td className='border border-gray-300 p-2'>
                  {item.alternative.name}
                </td>
                <td className='border border-gray-300 p-2'>{item.sValue}</td>
                <td className='border border-gray-300 p-2'>{item.rankValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        </div>
      </div>
    </>
  );
}
