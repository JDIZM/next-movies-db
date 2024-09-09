'use client';
import { useTrendingMoviesQuery } from '@/lib/features/movies/moviesSlice';
import { Movie } from '@/types/movies';
import Image from 'next/image';
import Link from 'next/link';

export function TrendingMovies() {
  const { data, error, isLoading } = useTrendingMoviesQuery(1);
  const { results } = data || {};

  if (isLoading) return <div className='py-10 text-center'>Loading...</div>;

  if (error)
    return (
      <div className='py-10 text-center text-red-500'>Error: Failed to load trending movies</div>
    );

  return (
    <section className='mx-auto max-w-7xl px-2 py-6 sm:px-4 md:px-6 lg:px-8'>
      <h2 className='mb-4 text-2xl font-bold sm:text-3xl'>Trending Movies</h2>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {results?.map((movie: Movie, index: number) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'
          >
            <div className='relative aspect-[2/3] w-full'>
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
                className='object-cover'
                priority={index < 4}
                loading={index < 4 ? 'eager' : 'lazy'}
              />
            </div>
            <div className='p-2 sm:p-3'>
              <h3 className='mb-1 truncate text-sm font-semibold sm:text-base'>{movie.title}</h3>
              <p className='mb-1 text-xs text-gray-600 sm:text-sm'>{movie.release_date}</p>
              <div className='flex items-center'>
                <span className='mr-1 text-yellow-500'>★</span>
                <span className='text-xs sm:text-sm'>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TrendingMovies;
