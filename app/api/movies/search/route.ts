import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Parameters_ = {
  query: string;
};

interface Context {
  params: undefined | Parameters_;
}

type SearchParameters = {
  query: string;
  page: string;
};

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export async function GET(request: NextRequest, context: Context) {
  const searchParameters = request.nextUrl.searchParams;
  const query = searchParameters.get('query');
  const page = searchParameters.get('page');
  const apiUrl = process.env.BASE_API_URL;

  if (!apiUrl) {
    throw new Error('BASE_API_URL is not defined');
  }

  if (!query) {
    throw new Error('query is required');
  }

  const url = new URL(`${apiUrl}search/movie`);

  const parameters: SearchParameters = { query, page: page || '1' };

  for (const [key, value] of Object.entries(parameters)) {
    url.searchParams.append(key, value);
  }

  console.log(url.toString());

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
