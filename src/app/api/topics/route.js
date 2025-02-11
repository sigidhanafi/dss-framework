import { NextResponse } from 'next/server';
import { getTopics } from '@/lib/topic-services';

export async function GET() {
  try {
    const topics = await getTopics();
    return NextResponse.json({
      status: 200,
      message: 'Success fetch topic',
      data: topics,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching topic' },
      { status: 500 }
    );
  }
}
