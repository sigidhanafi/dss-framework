import { NextResponse } from 'next/server';
import { getTopicDetail } from '@/lib/services/topics';

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const topics = await getTopicDetail(id);
        return NextResponse.json({
            status: 200,
            message: 'Success fetch topic',
            data: topics,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching topic', detail: error },
            { status: 500 }
        );
    }
}

/*
--> GET {url}/api/topics/:id_topic
--> GET DETAIL TOPIC
RES BODY
{
    "status": 200,
    "message": "Success fetch topic",
    "data": {
        "topicId": 2,
        "name": "Beli Makan Malam",
        "description": "Beli Makan Malam",
        "criterias": [
            {
                "criteriaId": 1,
                "name": "Harga",
                "description": null,
                "type": "COST",
                "weight": 1,
                "parentCriteriaId": null,
                "subCriteria": [
                    {
                        "criteriaId": 3,
                        "name": "Lokasi",
                        "description": null,
                        "type": "COST",
                        "weight": 2,
                        "parentCriteriaId": 1,
                        "subCriteria": []
                    }
                ]
            },
            {
                "criteriaId": 5,
                "name": "Tidak Basi",
                "description": "Layak Makan",
                "type": "BENEFIT",
                "weight": 1,
                "parentCriteriaId": null,
                "subCriteria": []
            }
        ]
    }
}
*/