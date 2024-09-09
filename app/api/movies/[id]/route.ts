import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const apiUrl = process.env.BASE_API_URL;

  if (!apiUrl) {
    throw new Error('BASE_API_URL is not defined');
  }

  const { id } = context.params;

  const url = new URL(`${apiUrl}movie/${id}`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  const data = await response.json();

  return NextResponse.json(data);
}
