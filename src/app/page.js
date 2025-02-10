import FromInput from '@/components/form-input';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <div className='flex flex-col items-center justify-center min-h-60'>
        <h1 className='text-3xl font-bold'>DSS Framework</h1>
        <p>A framework that will help you to choose the alternative</p>
      </div>

      {/* How it Work Section */}
      <div className='w-3/5 mx-auto bg-purple-200 text-center rounded-lg py-6 px-6'>
        <h2 className='text-xl font-semibold mb-6'>How it Work</h2>
        <div className='grid grid-cols-4 gap-6 justify-center'>
          {[
            { img: '/icons/topic.png', text: 'Input atau Pilih Topik' },
            { img: '/icons/criteria.png', text: 'Atur Kriteria' },
            {
              img: '/icons/alternatives.png',
              text: 'Input Alternatif Pilihan',
            },
            { img: '/icons/ranking.png', text: 'Ranking Alternatif Pilihan' },
          ].map((item, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='w-40 h-40 bg-white rounded-full flex items-center justify-center'>
                {/* <img src={item.img} alt={item.text} className='w-16 h-16' /> */}
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
            <a href='#' className='text-sm text-gray-600 hover:text-blue-500'>
              Lihat Semua
            </a>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <div className='bg-blue-200 p-4 rounded-lg'>
              Memilih Kandidat Karyawan Terbaik
            </div>
            <div className='bg-blue-200 p-4 rounded-lg'>
              Memilih Kandidat Beasiswa
            </div>
            <div className='bg-blue-200 p-4 rounded-lg'>
              Memilih HP terbaik 2025
            </div>
            <div className='bg-blue-200 p-4 rounded-lg'>
              Memilih Kampus Terbaik
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
