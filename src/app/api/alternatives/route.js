import { NextResponse } from 'next/server';
import { createAlternative } from '@/lib/services/alternatives';

export async function POST(req) {
  const body = await req.json();
  const { topicId, name, description } = body;

  console.log('body', body);

  try {
    const _ = await createAlternative(topicId, name, description);
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

/*
--> POST {url}/api/alternatives
--> CREATE NEW ALTERNATIVE
REQ BODY
{
    "topicId": 1,
    "name": "Nasi Padang",
    "description": "Nasi Padang"
}

RES BODY
{
    "status": 200,
    "message": "Success create alternative",
    "data": {}
}
*/
