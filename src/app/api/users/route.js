import { NextResponse } from 'next/server';
import { createUser, getUsers } from '@/lib/services/users';

export async function GET() {
  try {
    const topics = await getUsers();
    return NextResponse.json({
      status: 200,
      message: 'Success fetch users',
      data: topics,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching users', detail: error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const body = await req.json();
  const { name, username, password } = body;

  try {
    const _ = await createUser(name, username, password);
    return NextResponse.json({
      status: 200,
      message: 'Success create user',
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error create user', detail: error },
      { status: 500 }
    );
  }
}

