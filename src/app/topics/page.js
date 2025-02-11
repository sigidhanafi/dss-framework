'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TopicPage() {
  const router = useRouter();

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
              className='flex bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600'
              onClick={() => {
                router.push('/topics/create');
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
              <span className='mx-2'>Add Topic</span>
            </button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {[
              {
                id: 1,
                name: 'Memilih Kandidat Karyawan Terbaik',
                author: 'sigidhanafi',
              },
              {
                id: 2,
                name: 'Memilih Kandidat Beasiswa',
                author: 'Silmi',
              },
              {
                id: 3,
                name: 'Memilih HP terbaik 2025',
                author: 'Alfy',
              },
              {
                id: 4,
                name: 'Memilih Kampus Terbaik 2025',
                author: 'Rafa',
              },
              {
                id: 5,
                name: 'Memilih Kandidat Karyawan Terbaik',
                author: 'sigidhanafi',
              },
              {
                id: 6,
                name: 'Memilih Kandidat Beasiswa',
                author: 'Silmi',
              },
              {
                id: 7,
                name: 'Memilih HP terbaik 2025',
                author: 'Alfy',
              },
              {
                id: 8,
                name: 'Memilih Kampus Terbaik 2025',
                author: 'Rafa',
              },
              {
                id: 9,
                name: 'Memilih Kandidat Karyawan Terbaik',
                author: 'sigidhanafi',
              },
              {
                id: 10,
                name: 'Memilih Kandidat Beasiswa',
                author: 'Silmi',
              },
            ].map((item) => {
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
    </>
  );
}
