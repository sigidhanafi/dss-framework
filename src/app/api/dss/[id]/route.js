import { NextResponse } from 'next/server';
import { addCriterias, getDetailDss, saveDssResult } from '@/lib/services/dss';

export async function GET({ params }) {
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