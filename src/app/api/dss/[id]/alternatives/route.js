import { NextResponse } from 'next/server';
import { getAlternatives } from '@/lib/services/alternatives';

export async function GET(req, { params }) {

    const { id } = await params;

    try {
        const alternative = await getAlternatives({ dssId: parseInt(id) });
        return NextResponse.json({
            status: 200,
            message: 'Success fetch alternative',
            data: alternative,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching alternative', detail: error },
            { status: 500 }
        );
    }
}