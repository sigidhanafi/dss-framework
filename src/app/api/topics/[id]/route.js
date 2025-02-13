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
        "topicId": 1,
        "name": "Beli Makan Siang",
        "description": "Beli Makan Siang",
        "criterias": [
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
        ],
        "alternatives": [
            {
                "alternativeId": 1,
                "name": "Nasi Padang",
                "description": "Terenak"
            }
        ]
    }
}
*/