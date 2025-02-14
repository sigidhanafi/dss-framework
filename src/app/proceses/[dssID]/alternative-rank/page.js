'use client';

import Stepper from '@/components/stepper';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AlternativeRankPage() {
  const router = useRouter();
  const { dssID } = useParams();

  const [topic, setTopic] = useState();
  const [dssAlternatives, setDssAlternatives] = useState([]);

  // const alternatives = [
  //   { name: 'Sigit', score: '90.78', rank: '1' },
  //   { name: 'Silmi', score: '80.78', rank: '2' },
  //   { name: 'Alfy', score: '70.78', rank: '3' },
  //   { name: 'Rafa', score: '60.78', rank: '4' },
  // ];

  const fetchDetailDss = async () => {
    const response = await fetch('/api/dss/' + dssID, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();

    if (responseJson.status == 200) {
      const data = responseJson.data;

      setDssAlternatives(data.dssAlternatives);

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

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Topic: {topic && topic.name}</h1>
        <p>{topic && topic.description}</p>
      </div>

      <Stepper step={4} />
      <div className='py-8'>
        <div className='w-3/5 mx-auto'>
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
                  <td className='border border-gray-300 p-2'>
                    {item.rankValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='w-3/5 mx-auto'>
        <div className='flex justify-end space-x-4 my-4'>
          <button
            className='bg-blue-400 text-white px-4 py-2 rounded'
            onClick={() => {
              router.push('/histories');
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
}
