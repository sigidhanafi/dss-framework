'use client';

import AlternativeValue from '@/components/alternative-value';
import SettingCriteria from '@/components/setting-criteria';
import Stepper from '@/components/stepper';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AlternativeValuePage() {
  const router = useRouter();

  const { dssID } = useParams();

  const [topic, setTopic] = useState(null);
  const [alternatives, setAlternatives] = useState([
    { name: 'Sigit', value: '' },
    { name: 'Silmi', value: '' },
    { name: 'Alfy', value: '' },
    { name: 'Rafa', value: '' },
  ]);
  const [selectedMethod, setSelectedMethod] = useState();

  const fetchDetailDss = async () => {
    const response = await fetch('/api/dss/' + dssID, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();

    if (responseJson.status == 200) {
      const data = responseJson.data;
      // setTopic({ id: data.id, name: data.name, description: data.description });
      // setCriterias(data.criterias);
      // setAlternatives(data.alternatives);

      setSelectedMethod(data.method);
      setTopic({
        name: data.topic.name,
        topicId: data.topic.topicId,
        description: data.topic.description,
      });
    } else {
      // handle error
    }
  };

  useEffect(() => {
    fetchDetailDss();
  }, []);

  const criteriaAlternativeValue = [
    {
      name: 'Pengalaman',
      desc: 'Lama bekerja dalam bidang terkait',
      type: 'Benefit',
      weight: 'Tinggi',
      alternatives: [
        { name: 'Sigit', value: '' },
        { name: 'Silmi', value: '' },
        { name: 'Alfy', value: '' },
        { name: 'Rafa', value: '' },
      ],
      subCriteria: [
        {
          name: '> 5 Tahun',
          desc: 'Pengalaman lebih dari 5 tahun',
          type: 'Benefit',
          weight: 'Tinggi',
          alternatives: [
            { name: 'Sigit', value: '' },
            { name: 'Silmi', value: '' },
            { name: 'Alfy', value: '' },
            { name: 'Rafa', value: '' },
          ],
          subCriteria: [
            {
              name: 'Sub Sub Criteria',
              desc: 'Sub Sub Sub',
              type: 'Benefit',
              weight: 'Tinggi',
              alternatives: [
                { name: 'Sigit', value: '' },
                { name: 'Silmi', value: '' },
                { name: 'Alfy', value: '' },
                { name: 'Rafa', value: '' },
              ],
              subCriteria: [],
            },
          ],
        },
        {
          name: '3-5 Tahun',
          desc: 'Pengalaman antara 3 hingga 5 tahun',
          type: 'Benefit',
          weight: 'Sedang',
          alternatives: [
            { name: 'Sigit', value: '' },
            { name: 'Silmi', value: '' },
            { name: 'Alfy', value: '' },
            { name: 'Rafa', value: '' },
          ],
          subCriteria: [],
        },
        {
          name: '< 3 Tahun',
          desc: 'Pengalaman kurang dari 3 tahun',
          type: 'Benefit',
          weight: 'Rendah',
          alternatives: [
            { name: 'Sigit', value: '' },
            { name: 'Silmi', value: '' },
            { name: 'Alfy', value: '' },
            { name: 'Rafa', value: '' },
          ],
          subCriteria: [],
        },
      ],
    },
    {
      name: 'Universitas',
      desc: 'Asal universitas',
      type: 'Benefit',
      weight: 'Tinggi',
      alternatives: [
        { name: 'Sigit', value: '' },
        { name: 'Silmi', value: '' },
        { name: 'Alfy', value: '' },
        { name: 'Rafa', value: '' },
      ],
      subCriteria: [],
    },
    {
      name: 'IPK',
      desc: 'Indeks Prestasi Kumulatif akademik',
      type: 'Benefit',
      weight: 'Sedang',
      alternatives: [
        { name: 'Sigit', value: '' },
        { name: 'Silmi', value: '' },
        { name: 'Alfy', value: '' },
        { name: 'Rafa', value: '' },
      ],
      subCriteria: [
        {
          name: '> 3.5',
          desc: 'IPK lebih dari 3.5',
          type: 'Benefit',
          weight: 'Tinggi',
          alternatives: [
            { name: 'Sigit', value: '' },
            { name: 'Silmi', value: '' },
            { name: 'Alfy', value: '' },
            { name: 'Rafa', value: '' },
          ],
          subCriteria: [],
        },
        {
          name: '3.0 - 3.5',
          desc: 'IPK antara 3.0 dan 3.5',
          type: 'Benefit',
          weight: 'Sedang',
          alternatives: [
            { name: 'Sigit', value: '' },
            { name: 'Silmi', value: '' },
            { name: 'Alfy', value: '' },
            { name: 'Rafa', value: '' },
          ],
          subCriteria: [],
        },
        {
          name: '< 3.0',
          desc: 'IPK kurang dari 3.0',
          type: 'Benefit',
          weight: 'Rendah',
          alternatives: [
            { name: 'Sigit', value: '' },
            { name: 'Silmi', value: '' },
            { name: 'Alfy', value: '' },
            { name: 'Rafa', value: '' },
          ],
          subCriteria: [],
        },
      ],
    },
  ];

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>
          Select Method: {topic && topic.name}
        </h1>
        <p>{topic && topic.description}</p>
      </div>

      <Stepper step={3} />

      <AlternativeValue
        alternatives={alternatives}
        showAction={false}
        criteriaAlternativeValue={criteriaAlternativeValue}
      />

      {/* Method Selection Section */}
      <div className='w-3/5 mx-auto mt-10'>
        <h2 className='text-lg font-semibold mb-4'>Choose Method</h2>
        <div className='grid grid-cols-3 gap-6'>
          {['WP', 'SAW', 'TOPSIS'].map((method, index) => (
            <div
              key={index}
              className={`border p-4 rounded shadow-sm text-center hover:bg-gray-100 cursor-pointer flex items-center justify-between ${
                selectedMethod === method ? 'border-blue-500' : ''
              }`}
              onClick={() => setSelectedMethod(method)}
            >
              <div className='flex-grow'>
                <h3 className='text-lg font-semibold'>{method}</h3>
                <p className='text-gray-600'>
                  Metode {method} untuk pengambilan keputusan
                </p>
              </div>
              {selectedMethod === method && (
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
              )}
            </div>
          ))}
        </div>
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
          <button
            className='bg-blue-400 text-white px-4 py-2 rounded'
            onClick={() => {
              router.replace('/proceses/' + dssID + '/alternative-rank');
            }}
          >
            Calculate
          </button>
        </div>
      </div>
    </>
  );
}
