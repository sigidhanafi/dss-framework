import { NextResponse } from 'next/server';
import { deleteAlternative, getOneAlternative, updateAlternative } from '@/lib/services/alternatives';

export async function GET(req, { params }) {
    const { id } = await params;

    try {
        const alternative = await getOneAlternative({dssAlternativeId: parseInt(id)});
        return NextResponse.json({
            status: 200,
            message: 'Success fetch alternative',
            data: alternative,
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching alternative', detail: error },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const body = await req.json();
    const { alternativeName, description } = body;
 
    try {
      const _ = await updateAlternative(id, { 
        alternativeName, 
        description });
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