import { NextResponse } from 'next/server';
import { getDssById } from '@/lib/services/dss';

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const topics = await getDssById(id);
        return NextResponse.json({
            status: 200,
            message: 'Success fetch alternative',
            data: topics,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching alternative', detail: error },
            { status: 500 }
        );
    }
}