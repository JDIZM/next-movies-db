'use client';
import { useGetMovieByIdQuery, useSearchMoviesQuery } from '@/lib/features/movies/moviesSlice';
import Image from 'next/image';

type DisplayMovieProperties = {
  id?: string;
  query?: string;
  page?: number;
};

export function DisplayMovie({ id, query, page = 1 }: DisplayMovieProperties) {
  const {
    data: movieData,
    error: movieError,
    isLoading: movieIsLoading,
  } = useGetMovieByIdQuery(id ?? '', { skip: !id });

  const {
    data: searchData,
    error: searchError,
    isLoading: searchIsLoading,
  } = useSearchMoviesQuery({ query: query ?? '', page }, { skip: !query });

  const isLoading = movieIsLoading || searchIsLoading;
  const error = movieError || searchError;
  const data = id ? movieData : searchData?.results && searchData.results[0];

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error: There was an issue loading that movie, please reload the page.</h2>;

  if (!data) return <h2>No movie found.</h2>;

  return (
    <div className='mx-auto max-w-3xl rounded-lg bg-base-200 p-6 shadow-md'>
      <div className='flex flex-col md:flex-row'>
        <div className='mb-4 md:mb-0 md:mr-6 md:w-1/3'>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={data.title}
            width={300}
            height={450}
            className='rounded-lg shadow-sm'
          />
        </div>
        <div className='md:w-2/3'>
          <h1 className='mb-4 text-3xl font-bold text-base-content'>{data.title}</h1>
          <p className='mb-6 text-base-content/70'>{data.overview}</p>
          <ul className='space-y-2 text-base-content'>
            <li>
              <span className='font-semibold'>Rating:</span> {data.popularity}
            </li>
            <li>
              <span className='font-semibold'>Released:</span> {data.release_date}
            </li>
            <li>
              <span className='font-semibold'>Average rating:</span> {data.vote_average}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
