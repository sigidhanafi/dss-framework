import { NextResponse } from 'next/server';
import { createDss, getDss } from '@/lib/services/dss';

export async function GET() {
  try {
    const dss = await getDss();
    return NextResponse.json({
      status: 200,
      message: 'Success fetch dss',
      data: dss,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching dss', detail: error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
    const body = await req.json();
    const { topicId } = body;
 
    try {
      const dss = await createDss(topicId);
      return NextResponse.json({
        status: 200,
        message: 'Success create dss',
        data: { dssId: dss.dssId },
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error create dss', detail: error },
        { status: 500 }
      );
    }
  };


/*
--> POST {url}/api/dss
--> CHOOSE TOPIC AND METHOD
REQ BODY
{ 
    "topicId": 1
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
