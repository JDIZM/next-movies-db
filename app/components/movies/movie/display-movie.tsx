'use client';
import { useSearchMoviesQuery } from '@/lib/features/movies/moviesSlice';
import Image from 'next/image';

type DisplayMovieProperties = {
  query: string;
  page: number;
};

export function DisplayMovie({ query = 'jumanji', page = 1 }: DisplayMovieProperties) {
  const { data, error, isLoading } = useSearchMoviesQuery({ query, page });

  const [result] = data?.results || [];

  console.log('DisplayMovie data..', data);
  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error: There was an issue loading that movie, please reload the page.</h2>;

  return (
    <div className='mx-auto max-w-3xl rounded-lg bg-base-200 p-6 shadow-md'>
      <div className='flex flex-col md:flex-row'>
        <div className='mb-4 md:mb-0 md:mr-6 md:w-1/3'>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            alt={result.title}
            width={300}
            height={450}
            className='rounded-lg shadow-sm'
          />
        </div>
        <div className='md:w-2/3'>
          <h1 className='mb-4 text-3xl font-bold text-base-content'>{result.title}</h1>
          <p className='mb-6 text-base-content/70'>{result.overview}</p>
          <ul className='space-y-2 text-base-content'>
            <li>
              <span className='font-semibold'>Rating:</span> {result.popularity}
            </li>
            <li>
              <span className='font-semibold'>Released:</span> {result.release_date}
            </li>
            <li>
              <span className='font-semibold'>Average rating:</span> {result.vote_average}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
