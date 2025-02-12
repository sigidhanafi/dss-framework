import { NextResponse } from 'next/server';
import { createAlternative } from '@/lib/services/alternatives';

export async function POST(req) {
    const body = await req.json();
    const { dssId, alternativeName, description } = body;
 
    try {
      const _ = await createAlternative(dssId, alternativeName, description);
      return NextResponse.json({
        status: 200,
        message: 'Success create alternative',
        data: {},
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error create alternative', detail: error },
        { status: 500 }
      );
    }
  }

  