import { NextResponse } from 'next/server';
import { getCriteriaById, updateCriteria } from '@/lib/services/criterias';

export async function PUT(req, { params }) {
    const { id } = await params;
    const body = await req.json();
    const { name, description, type, weight } = body;
 
    try {
      const _ = await updateCriteria(id, { 
        name, 
        description,
        type, 
        weight });
      return NextResponse.json({
        status: 200,
        message: 'Success update criteria',
        data: {},
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error update criteria', detail: error },
        { status: 500 }
      );
    }
  }

  export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const criteria = await getCriteriaById(id);
        return NextResponse.json({
            status: 200,
            message: 'Success fetch criteria',
            data: criteria,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching criteria', detail: error },
            { status: 500 }
        );
    }
}


/*
--> GET {url}/api/criterias/:id_criteria
--> GET CRITERIA DETAIL
RES BODY
{
    "status": 200,
    "message": "Success fetch criteria",
    "data": {
        "criteriaId": 4,
        "name": "Sehat",
        "description": "Bergizi",
        "type": "BENEFIT",
        "weight": 1
    }
}

--> PUT {url}/api/criterias/:id_criteria
--> UPDATE CRITERIA
REQ BODY
{ 
    "name":"Sehat",
    "description": "Bergizi",
    "type":"BENEFIT", 
    "weight":1
}

RES BODY
{
    "status": 200,
    "message": "Success update criteria",
    "data": {}
}


*/


