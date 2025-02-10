import Link from 'next/link';

export default function TopicPage() {
  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-60'>
        <h1 className='text-3xl font-bold'>Explore Topic</h1>
        <p>Explore and use topic that relevant with your problem</p>
      </div>

      {/* List of Topic */}
      <div className='w-3/5 mx-auto text-center rounded-lg'>
        <div className='py-8 text-center'>
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
                <Link href={'/topics/' + item.id}>
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
