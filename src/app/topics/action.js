'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTopics(params) {
  const response = await fetch(`${API_URL}/api/topics`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  const responseJson = await response.json();
  return responseJson.data;
}

export async function createTopic(params) {
  const response = await fetch(`${API_URL}/api/topics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const responseJson = await response.json();

  if (responseJson.status == 200) {
    revalidatePath('/topics');
    revalidateTag('topics');
  }

  return responseJson.status;
}
