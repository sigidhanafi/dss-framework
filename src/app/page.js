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
      <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto border-blue-200 border text-center rounded-lg py-6 px-6'>
        <h2 className='text-xl font-semibold mb-6'>How it Work</h2>
        <div className='flex flex-col lg:flex-row justify-center flex-shrink'>
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
            <div className='flex flex-1' key={index}>
              <div className='flex flex-col mx-auto items-center'>
                <div className='w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center'>
                  <img src={item.img} alt={item.text} className='w-16 h-16' />
                </div>
                <div className='flex mx-auto mt-2 mb-8 px-2'>
                  <p className=' text-gray-700'>
                    {index + 1}. {item.text}
                  </p>
                </div>
              </div>
              {index < 3 && (
                <div className='hidden xl:flex xl:flex-col items-center justify-center -mt-20'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-12 text-blue-200'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Topic Selection */}
      <div className='w-11/12 md:w-4/5 lg:w-3/5 mx-auto py-8 text-center rounded-lg'>
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
