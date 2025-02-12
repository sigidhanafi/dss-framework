import { NextResponse } from 'next/server';
import { createCriteria } from '@/lib/services/criterias';

export async function POST(req) {
    const body = await req.json();
    const { topicId, name, description, type, weight, parentCriteriaId } = body;
 
    try {
      const _ = await createCriteria({ 
        topicId, 
        name, 
        description,
        type, 
        weight, 
        parentCriteriaId });
      return NextResponse.json({
        status: 200,
        message: 'Success create criteria',
        data: {},
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error create criteria', detail: error },
        { status: 500 }
      );
    }
  }


/*
--> POST {url}/api/criterias
--> CREATE NEW CRITERIA
REQ BODY
{ 
    "topicId": 1,
    "name":"Harga",
    "description": "Harus Murah",
    "type":"COST", 
    "weight":5, 
    "parentCriteriaId":null
}

RES BODY
{
    "status": 200,
    "message": "Success create criteria",
    "data": {}
}
*/



