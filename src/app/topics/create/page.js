'use client';

import { useRouter } from 'next/navigation';

export default function CreateTopicPage() {
  const router = useRouter();

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20'>
        <h1 className='text-3xl font-bold'>Create Topic</h1>
        <p>Create topic for your decission problem</p>
      </div>

      {/* Form Section */}
      <div className='w-3/5 mx-auto mt-10 p-6 border rounded shadow-sm bg-white'>
        <h2 className='text-lg font-semibold mb-4'>Topic Data</h2>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Name</label>
          <input
            type='text'
            name='name'
            value={''}
            onChange={(e) => {}}
            className='border p-2 w-full rounded mt-1'
            placeholder='Topic Name'
            autoComplete='off'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium'>Description</label>
          <textarea
            name='description'
            value={''}
            onChange={(e) => {}}
            className='border p-2 w-full rounded mt-1'
            placeholder='Topic Description'
            autoComplete='off'
          ></textarea>
        </div>
        <div className='flex space-x-4 justify-end'>
          <button
            onClick={() => {
              router.back();
            }}
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              router.replace('/topics/2');
            }}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
