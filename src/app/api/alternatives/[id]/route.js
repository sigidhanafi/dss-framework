import { NextResponse } from 'next/server';
import {
  deleteAlternative,
  getOneAlternative,
  updateAlternative,
} from '@/lib/services/alternatives';

// export async function GET(req, { params }) {
//   const { id } = await params;

//   try {
//     const alternative = await getOneAlternative({
//       alternativeId: parseInt(id),
//     });
//     return NextResponse.json({
//       status: 200,
//       message: 'Success fetch alternative',
//       data: alternative,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Error fetching alternative', detail: error },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const { name, description } = body;

  try {
    const _ = await updateAlternative(id, {
      name,
      description,
    });
    return NextResponse.json({
      status: 200,
      message: 'Success update alternative',
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error update alternative', detail: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const criteria = await deleteAlternative(id);
    return NextResponse.json({
      status: 200,
      message: 'Success delete alternative',
      data: criteria,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error delete alternative', detail: error },
      { status: 500 }
    );
  }
}

/*
--> GET {url}/api/alternatives/:id_alternative
--> GET ALTERNATIVE DETAIL
RES BODY
{
    "status": 200,
    "message": "Success fetch alternative",
    "data": {
        "alternativeId": 1,
        "name": "Nasi Padang",
        "description": "Terenak"
    }
}

--> PUT {url}/api/alternatives/:id_alternative
--> UPDATE ALTERNATIVE

REQ BODY
{
    "name": "Putra Bahari",
    "description": "Terenak"
}

RES BODY
{
    "status": 200,
    "message": "Success update alternative",
    "data": {}
}

--> DELETE {url}/api/alternatives/:id_alternative
--> DELETE ALTERNATIVE

RES BODY
{
    "status": 200,
    "message": "Success delete alternative",
    "data": "success"
}
*/
