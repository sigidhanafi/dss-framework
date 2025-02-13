'use client';

import Modal from '@/components/modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TopicPage() {
  const router = useRouter();

  const [topics, setTopics] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTopics = async () => {
    const response = await fetch('/api/topics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseJson = await response.json();

    console.log('RESPONSE', responseJson);
    setTopics(responseJson.data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Explore Topic</h1>
        <p>Explore and use topic that relevant with your problem</p>
      </div>

      {/* List of Topic */}
      <div className='w-3/5 mx-auto text-center rounded-lg'>
        <div className='py-8 text-center'>
          <div className='mx-auto flex justify-end'>
            <button
              className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
              onClick={() => {
                setShowForm(true);
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path
                  fillRule='evenodd'
                  d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='mx-2'>New Topic</span>
            </button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {topics.map((item) => {
              return (
                <Link key={item.id} href={'/topics/' + item.id}>
                  <div className='bg-blue-200 p-4 rounded-lg'>
                    <p>{item.name}</p>
                    <span className='text-xs'>by {item.author}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <Modal
          title={'Create New Topic'}
          onCancel={() => {
            setShowForm(false);
          }}
        >
          {/* Form */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Topic Name
              </label>
              <input
                type='text'
                className='w-full p-2 border rounded-md'
                placeholder='Enter topic name'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                className='w-full p-2 border rounded-lg'
                placeholder='Enter topic description'
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                setShowForm(false);
                router.push('/topics/2');
              }}
              className='flex bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500'
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
