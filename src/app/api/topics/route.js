import { NextResponse } from 'next/server';
import { createTopic, getTopics } from '@/lib/services/topics';

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
      { message: 'Error fetching topic', detail: error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, description } = body;

  try {
    const _ = await createTopic(name, description);
    return NextResponse.json({
      status: 200,
      message: 'Success create topic',
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error create topic', detail: error },
      { status: 500 }
    );
  }
}

/*
--> POST {url}/api/topics
--> CREATE NEW TOPIC
REQ BODY
{
    "name": "Beli Makan Malam",
    "description": "Beli Makan Malam"
}

RES BODY
{
    "status": 200,
    "message": "Success create topic",
    "data": {}
}

--> GET {url}/api/topics
--> GET LIST TOPICS
RES BODY
{
    "status": 200,
    "message": "Success fetch topic",
    "data": [
        {
            "id": 1,
            "name": "Beli Makan Siang",
            "author": "Gon"
        }
    ]
}
*/

