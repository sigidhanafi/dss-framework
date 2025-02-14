import { NextResponse } from 'next/server';
import { createDssAlternative, deleteDssAlternative, getDssAltenatives} from '@/lib/services/alternatives';


export async function POST(req, { params }) {
    const { id } = await params;
    const { alternativeId } = await req.json();

    try {
        const dssCriteria = await createDssAlternative({ 
            dssId: parseInt(id),
            alternativeId: alternativeId });
        return NextResponse.json({
            status: 200,
            message: 'Success create dss alternative',
            data: {
                dssAlternativeId: dssCriteria.dssAlternativeId
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error create dss alternative', detail: error },
            { status: 500 }
        );
    }
}

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const dssAlternatives = await getDssAltenatives({ dssId: parseInt(id) });
        return NextResponse.json({
            status: 200,
            message: 'Success fetch dss alternatives',
            data: dssAlternatives,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetch dss alternatives', detail: error },
            { status: 500 }
        );
    }
}
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

--> CREATE DSS ALTERNATIVES
--> GET {url}/api/dss/:id_topic/alternatives
REQ BODY
{
    "alternativeId": 1
}

RES BODY
{
    "status": 200,
    "message": "Success create dss alternative",
    "data": {
        "dssAlternativeId": 6
    }
}

--> GET {url}/api/dss/:id_topic/alternatives
--> GET DSS ALTERNATIVE
{
    "status": 200,
    "message": "Success fetch dss alternatives",
    "data": [
        {
            "alternativeId": 1,
            "name": "Nasi Padang",
            "description": "Terenak"
        }
    ]
}

--> DELETE {url}/api/dss/:id_dss/alternatives
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
