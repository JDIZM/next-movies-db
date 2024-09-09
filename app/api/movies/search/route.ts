import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Parameters_ = {
  query: string;
};
interface Context {
  params: undefined | Parameters_;
}

// TODO test movies db https://developer.themoviedb.org/reference/intro/getting-started
// const url = 'https://api.themoviedb.org/3/authentication';
// const options = {method: 'GET', headers: {accept: 'application/json'}};

type SearchParameters = {
  query: string;
  page: string;
};

// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export async function GET(request: NextRequest, context: Context) {
  // const parameters = context.params;
  // console.log('params', parameters);
  const searchParameters = request.nextUrl.searchParams;
  const query = searchParameters.get('query');
  // let page = 1;
  const page = searchParameters.get('page');
  console.log('query', query);
  console.log('page', page);
  const apiUrl = process.env.BASE_API_URL;

  if (!apiUrl) {
    throw new Error('BASE_API_URL is not defined');
  }

  if (!query) {
    throw new Error('query is required');
  }

  const url = new URL(`${apiUrl}search/movie`);

  const parameters: SearchParameters = { query, page: page || '1' };

  // for (const key of Object.keys(parameters)) url.searchParams.append(key, String(parameters[key]));
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

export async function POST(request: NextRequest, context: Context) {
  // const body: { amount: number } = await request.json();
  // const { amount = 1 } = body;

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ data: 2 });
}

// https://developer.themoviedb.org/reference/find-by-id
// 1. search movie by id
// 2. find by id with query params
// 3. display the movie data // json viewer

// images
// https://developer.themoviedb.org/docs/image-basics
// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
