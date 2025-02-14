import { NextResponse } from 'next/server';
import { getTopicCriterias } from '@/lib/services/topics';

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const criterias = await getTopicCriterias({ topicId: parseInt(id) });
        return NextResponse.json({
            status: 200,
            message: 'Success fetch topic criterias',
            data: criterias,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching topic criterias', detail: error },
            { status: 500 }
        );
    }
}

/*
--> GET {url}/api/topics/:id_topic/criterias
--> GET TOPIC CRITERIAS
RES BODY
{
    "status": 200,
    "message": "Success fetch topic criterias",
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
*/