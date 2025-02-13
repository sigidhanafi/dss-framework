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

export async function POST(req, { params }) {
    const { id } = await params;

    const body = await req.json();
    const { criterias, dssResult } = body;  
    
  try {

    let criteriaWithDssId = criterias.map((criteria) => ({
        ...criteria, 
        dssId: parseInt(id)
    }));
    await addCriterias(criteriaWithDssId);

    let dssResultWithDssId = dssResult.map((res) => ({
        ...res, 
        dssId: parseInt(id)
    }));
    await saveDssResult(dssResultWithDssId);

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
            "alternativeId": 2,
            "value": 20
        }
    ],
    "dssResult": [{
        "alternativeId": 2,
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
        "dssId": 3,
        "topic": {
            "topicId": 1,
            "name": "Beli Makan Siang"
        },
        "method": "WP",
        "creator": {
            "name": "Gon"
        },
        "dssAlternatives": [
            {
                "dssAlternativeId": 5,
                "alternative": {
                    "alternativeId": 1,
                    "name": "Nasi Padang"
                },
                "rankValue": 3,
                "sValue": 2
            }
        ],
        "dssCriteriaAlternatives": [
            {
                "dssCriteriaAlternativeId": 8,
                "alternative": {
                    "alternativeId": 1,
                    "name": "Nasi Padang"
                },
                "criteria": {
                    "criteriaId": 6,
                    "name": "Harga"
                },
                "value": 20
            }
        ]
    }
}
*/


