import { NextRequest, NextResponse } from 'next/server';
import { Movie } from '@/types/movies';

interface MoviesByMonth {
  [key: string]: Movie[];
}

export async function GET(request: NextRequest) {
  const apiUrl = process.env.BASE_API_URL;

  if (!apiUrl) {
    throw new Error('BASE_API_URL is not defined');
  }

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('start_date') || '2024-01-01';
  const endDate = searchParams.get('end_date') || '2024-03-31';

  const url = new URL(`${apiUrl}discover/movie`);

  url.searchParams.append('sort_by', 'popularity.desc');
  url.searchParams.append('primary_release_date.gte', startDate);
  url.searchParams.append('primary_release_date.lte', endDate);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  const data = await response.json();

  // Process the data to group movies by month
  // eslint-disable-next-line unicorn/no-array-reduce
  const moviesByMonth = data.results.reduce((accumulator: MoviesByMonth, movie: Movie) => {
    const month = movie.release_date.slice(0, 7); // Get YYYY-MM
    if (!accumulator[month]) {
      accumulator[month] = [];
    }
    accumulator[month].push(movie);
    return accumulator;
  }, {});

  // Calculate average popularity for each month
  const popularityByMonth = Object.entries<Movie[]>(moviesByMonth).map(([month, movies]) => {
    const avgPopularity = movies.reduce((sum, movie) => sum + movie.popularity, 0) / movies.length;
    return { month, avgPopularity };
  });

  return NextResponse.json(popularityByMonth);
}
