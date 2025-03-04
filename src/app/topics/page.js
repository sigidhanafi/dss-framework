import Pagination from '@/components/pagination';
import TopicList from '@/components/topic-list';
import { notFound } from 'next/navigation';

export default async function TopicPage({ searchParams }) {
  const fetchTopics = async (page) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(
      `${API_URL}/api/topics?page=${page}&limit=10`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    return await response.json();
  };

  // get param ?page
  const params = await searchParams;
  const page = params.page || 1;

  // server side data fetching
  const response = await fetchTopics(page);

  if (!response && response.status == 404) {
    notFound();
  }

  const topics = response.data;
  const pagination = response.pagination;

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20 mx-4'>
        <h1 className='text-3xl font-bold'>Explore Topic</h1>
        <p>Explore and use topic that relevant with your problem</p>
      </div>

      {/* List of Topic */}
      <TopicList data={topics} view={'explore'} />

      <Pagination page={pagination.page} total={pagination.total_page} />
    </>
  );
}
