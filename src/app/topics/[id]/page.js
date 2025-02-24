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
    if (responseJson.status == 200) {
      const data = responseJson.data;

      setTopic({ id: data.id, name: data.name, description: data.description });
      setCriterias(data.criterias);
      setAlternatives(data.alternatives);
    } else {
      // handle error
    }
  };

  const handleChooseTopic = async () => {
    const params = { topicId: Number(topicId), method: 'WP' };
    const response = await fetch('/api/dss', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const responseJson = await response.json();
    console.log('responseJson, ', responseJson.data);
    if (responseJson.status == 200) {
      router.push('/proceses/' + responseJson.data.dssId + '/select-criteria');
    } else {
      // show notif error
    }
  };

  useEffect(() => {
    fetchTopicDetail();
  }, []);

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
      <div className='flex flex-col items-center justify-center min-h-20 mt-20 mx-4 mx-4'>
        <h1 className='text-3xl font-bold'>Topic: {topic.name}</h1>
        <p>{topic.description}</p>
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
              handleChooseTopic();
            }}
          >
            Choose Topic
          </button>
        </div>
      </div>
    </>
  );
}
