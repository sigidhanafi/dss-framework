import { NextResponse } from 'next/server';
import { addCriterias, getDetailDss, saveDssResult } from '@/lib/services/dss';

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const dss = await getDetailDss(id);
        return NextResponse.json({
            status: 200,
            message: 'Success fetch alternative',
            data: dss,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching alternative', detail: error },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    const body = await req.json();
    const { criterias, dssResult } = body;  
    
  try {
    await addCriterias(criterias);
    await saveDssResult(dssResult);
    return NextResponse.json({
      status: 200,
      message: 'Success save dss result',
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error save dss result', detail: error },
      { status: 500 }
    );
  }
};


/*
--> POST {url}/api/dss/:id_dss
--> SAVE DSS VALUES AND RESULT
REQ BODY
{
    "criterias": [
        {
            "criteriaId": 1,
            "dssAlternativeId": 2,
            "value": 20
        }
    ],
    "dssResult": [{
        "dssAlternativeId": 2,
        "sValue": 2,
        "rankValue": 3
    }]
}

RES BODY
{
    "status": 200,
    "message": "Success save dss result",
    "data": {}
}

--> GET {url}/api/dss/:id_dss
--> GET DSS DETAIL
RES BODY
{
    "status": 200,
    "message": "Success fetch alternative",
    "data": {
        "dssId": 1,
        "topicId": 1,
        "method": "WP",
        "creator": {
            "name": "Gon"
        },
        "dssAlternatives": [
            {
                "dssAlternativeId": 2,
                "alternativeName": "Ganti",
                "sValue": 2,
                "rankValue": 3,
                "description": "HEGE",
                "dssCriterias": [
                    {
                        "criteria": {
                            "criteriaId": 1,
                            "name": "Harga"
                        },
                        "value": 20
                    }
                ]
            }
        ]
    }
}
*/


