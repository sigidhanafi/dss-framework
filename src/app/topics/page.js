import TopicList from '@/components/topic-list';
import { notFound } from 'next/navigation';
import { fetchTopics } from './action';

export default async function TopicPage() {
  const topics = await fetchTopics();

  if (!topics) {
    notFound();
  }

  return (
    <>
      {/* Header / Title */}
      <div className='flex flex-col items-center justify-center min-h-20 mt-20 mx-4'>
        <h1 className='text-3xl font-bold'>Explore Topic</h1>
        <p>Explore and use topic that relevant with your problem</p>
      </div>

      {/* List of Topic */}
      <TopicList data={topics} />
    </>
  );
}
