'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    const response = await fetch('/api/topics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();
    setTopics(responseJson.data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      {/* Main Content */}
      <div className='flex flex-col items-center justify-center min-h-60'>
        <h1 className='text-3xl font-bold'>DSS Framework</h1>
        <p>A framework that will help you to choose the alternative</p>
      </div>

      {/* How it Work Section */}
      <div className='w-3/5 mx-auto border-blue-200 border text-center rounded-lg py-6 px-6'>
        <h2 className='text-xl font-semibold mb-6'>How it Work</h2>
        <div className='grid grid-cols-4 gap-6 justify-center'>
          {[
            {
              img: '/criteria.png',
              text: 'Choose Topic & Setting Criteria',
            },
            { img: '/alternative.png', text: 'Review the Alternatives' },
            {
              img: '/review.png',
              text: 'Review Process & Select Method',
            },
            { img: '/ranking.png', text: 'Ranking Result' },
          ].map((item, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <div className='w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center'>
                <img src={item.img} alt={item.text} className='w-16 h-16' />
              </div>
              <p className='mt-2 px-2 text-gray-700'>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Selection */}
      <div className='w-3/5 mx-auto py-8 text-center rounded-lg'>
        <div className='py-8 text-center'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Explore Topic</h2>
            <Link
              href={'/topics'}
              className='text-sm text-gray-600 hover:text-blue-500'
            >
              Lihat Semua
            </Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {topics &&
              topics.length > 0 &&
              topics.map((topic) => {
                return (
                  <Link href={'/topics/' + topic.id} key={topic.id}>
                    <div className='border-blue-200 border p-4 rounded-lg'>
                      {topic.name}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
