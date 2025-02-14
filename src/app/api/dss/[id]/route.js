import { NextResponse } from 'next/server';
import { addCriterias, calculateDss, getDetailDss, getDssResult, updateDss, updateDssMethod } from '@/lib/services/dss';

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
    const { method, criterias } = body;  
    
  try {
    const _ = await updateDssMethod(parseInt(id), method);
    
    let criteriaWithDssId = criterias.map((criteria) => ({
        ...criteria, 
        dssId: parseInt(id)
    }));
    await addCriterias(criteriaWithDssId);

    await calculateDss(parseInt(id), method);
    const result = await getDssResult(parseInt(id));

    return NextResponse.json({
      status: 200,
      message: 'Success save dss result',
      data: result,
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
    "method": "WP",
    "criterias": [
        {
            "criteriaId": 1,
            "alternativeId": 2,
            "value": 20
        }
    ]
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
                "dssAlternativeId": 6,
                "alternative": {
                    "alternativeId": 1,
                    "name": "Nasi Padang"
                },
                "rankValue": null,
                "sValue": null
            },
            {
                "dssAlternativeId": 7,
                "alternative": {
                    "alternativeId": 1,
                    "name": "Nasi Padang"
                },
                "rankValue": null,
                "sValue": null
            }
        ],
        "dssCriterias": [
            {
                "criteriaId": 7,
                "name": "Bisa QRIS",
                "description": "Metode Pembayaran",
                "type": "BENEFIT",
                "weight": 1,
                "parentCriteriaId": null,
                "subCriteria": []
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


