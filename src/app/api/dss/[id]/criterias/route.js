import { NextResponse } from 'next/server';
import {
  createDssCriteria,
  deleteDssCriteria,
  getDssCriteria,
} from '@/lib/services/criterias';

export async function POST(req, { params }) {
  const { id } = await params;
  const { criteriaId } = await req.json();

  try {
    const dssCriteria = await createDssCriteria({
      dssId: parseInt(id),
      criteriaId: criteriaId,
    });
    return NextResponse.json({
      status: 200,
      message: 'Success create dss criterias',
      data: {
        dssCriteriaId: dssCriteria.dssCriteriaId,
      },
    });
  } catch (error) {
    console.log('ERR', error);
    return NextResponse.json(
      { message: 'Error create dss criterias', detail: error },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const dssCriterias = await getDssCriteria({ dssId: parseInt(id) });
    return NextResponse.json({
      status: 200,
      message: 'Success fetch dss criterias',
      data: dssCriterias,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetch dss criterias', detail: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const { criteriaId } = await req.json();

  try {
    const _ = await deleteDssCriteria(parseInt(criteriaId), parseInt(id));
    return NextResponse.json({
      status: 200,
      message: 'Success delete criteria',
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error delete criteria', detail: error },
      { status: 500 }
    );
  }
}

/*
--> POST {url}/api/dss/:id_topic/criterias
--> CREATE DSS CRITERIAS
REQ BODY
{
    "criteriaId": 1
}

RES BODY
{
    "status": 200,
    "message": "Success create dss criterias",
    "data": {
        "dssCriteriaId": 7
    }
}


--> GET {url}/api/dss/:id_topic/criterias
--> GET DSS CRITERIAS
{
    "status": 200,
    "message": "Success fetch dss criterias",
    "data": [
        {
            "criteriaId": 6,
            "name": "Harga",
            "description": "Yang harus dibayar",
            "type": "COST",
            "weight": 5,
            "parentCriteriaId": null,
            "subCriteria": [
                {
                    "criteriaId": 7,
                    "name": "Bisa QRIS",
                    "description": "Metode Pembayaran",
                    "type": "BENEFIT",
                    "weight": 1,
                    "parentCriteriaId": 6,
                    "subCriteria": []
                }
            ]
        }
    ]
}


--> DELETE {url}/api/dss/:id_topic/criterias
--> DELETE DSS CRITERIA
REQ BODY
{
    "criteriaId": 1
}

RES BODY
{
    "status": 200,
    "message": "Success delete criteria",
    "data": {}
}
*/
