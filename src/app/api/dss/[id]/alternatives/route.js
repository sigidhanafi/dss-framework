import { NextResponse } from 'next/server';
import { deleteDssAlternative } from '@/lib/services/alternatives';

export async function DELETE(req, { params }) {
    const { id } = await params;
    const { alternativeId } = await req.json();

    try {
        const _ = await deleteDssAlternative(parseInt(alternativeId), parseInt(id));
        return NextResponse.json({
            status: 200,
            message: 'Success delete alternative',
            data: {},
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error delete alternative', detail: error },
            { status: 500 }
        );
    }
}

/*
--> POST {url}/api/dss/:id_dss/alternatives
--> DELETE DSS ALTERNATIVE
REQ BODY
{
    "alternativeId": 5
}

RES BODY
{
    "status": 200,
    "message": "Success delete alternative",
    "data": {}
}
*/
