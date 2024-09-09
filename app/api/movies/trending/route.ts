import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: any) {
  const apiUrl = process.env.BASE_API_URL;

  if (!apiUrl) {
    throw new Error('BASE_API_URL is not defined');
  }

  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  const url = new URL(`${apiUrl}trending/movie/day`);
  url.searchParams.append('page', page);

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
