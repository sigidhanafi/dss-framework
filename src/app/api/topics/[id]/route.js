import { NextResponse } from 'next/server';
import { getTopicById } from '@/lib/services/topics';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const topics = await getTopicById(id);
        return NextResponse.json({
            status: 200,
            message: 'Success fetch topic',
            data: topics,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching topic', detail: error },
            { status: 500 }
        );
    }
}