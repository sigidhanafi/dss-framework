import { NextResponse } from 'next/server';
import { getAlternatives } from '@/lib/services/alternatives';

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const alternatives = await getAlternatives({ topicId: parseInt(id) });
    return NextResponse.json({
      status: 200,
      message: 'Success fetch topic criterias',
      data: alternatives,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching topic criterias', detail: error },
      { status: 500 }
    );
  }
}

/*
--> GET {url}/api/topics/:id_topic/alternatives
--> GET TOPIC ALTERNATIVES
RES BODY
{
    "status": 200,
    "message": "Success fetch topic criterias",
    "data": [
        {
            "alternativeId": 1,
            "name": "Nasi Padang",
            "description": "Terenak"
        }
    ]
}
*/
