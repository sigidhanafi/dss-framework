import TopicList from '@/components/topic-list';

export default async function Home() {
  const fetchTopics = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/api/topics`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const responseJson = await response.json();
    return responseJson.data;
  };

  const topics = await fetchTopics();

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
      <TopicList data={topics} view={'home'} />
    </>
  );
}
