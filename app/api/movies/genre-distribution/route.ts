import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiUrl = process.env.BASE_API_URL;

  if (!apiUrl) {
    throw new Error('BASE_API_URL is not defined');
  }

  const url = new URL(`${apiUrl}genre/movie/list`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  const data = await response.json();

  // Simulate genre distribution data
  const genreDistribution = data.genres.map((genre: { id: number; name: string }) => ({
    name: genre.name,
    value: Math.floor(Math.random() * 1000) + 1, // Random value between 1 and 1000
  }));

  return NextResponse.json(genreDistribution);
}
