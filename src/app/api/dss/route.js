import { NextResponse } from 'next/server';
import { createDss } from '@/lib/services/dss';

export async function POST(req) {
  const body = await req.json();
  const { topicId, method } = body;

  try {
    const dss = await createDss(topicId, method);
    return NextResponse.json({
      status: 200,
      message: 'Success create dss',
      data: { dssId: dss.dssId },
    });
  } catch (error) {
    console.log('errr', error);
    return NextResponse.json(
      { message: 'Error create dss', detail: error },
      { status: 500 }
    );
  }
}

/*
--> POST {url}/api/dss
--> CHOOSE TOPIC AND METHOD
REQ BODY
{ 
    "topicId": 1,
    "method":"WP"
}

RES BODY
{
    "status": 200,
    "message": "Success create dss",
    "data": {
        "dssId": 2
    }
}
*/
