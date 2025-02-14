'use client';

import Modal from '@/components/modal';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const router = useRouter();

  const [loadingPage, setLoadingPage] = useState(true);
  const [dss, setDss] = useState([]);

  const fetchDss = async () => {
    const response = await fetch('/api/dss', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();
    console.log('responseJson.data', responseJson.data);
    setDss(responseJson.data);
    setLoadingPage(false);
  };

  useEffect(() => {
    fetchDss();
  }, []);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Histories DSS Process</h1>
        <p>Your history dss process</p>
      </div>

      {/* List of DSS */}
      <div className='w-3/5 mx-auto text-center rounded-lg'>
        <div className='py-8 text-center'>
          {loadingPage == false && dss && dss.length <= 0 && (
            <div className='mt-4 p-4 border-blue-200 border rounded-lg'>
              <p className='text-gray-500'>No DSS available</p>
            </div>
          )}
          {loadingPage == false && dss && dss.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {dss.map((item) => {
                return (
                  <Link key={item.dssId} href={'/histories/' + item.dssId}>
                    <div className='border-blue-200 border p-4 rounded-lg'>
                      <p className='text-lg'>{item.topic.name}</p>
                      <p className='text-xs'>{item.topic.description}</p>
                      <span className='text-xs'>by {item.creator.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
