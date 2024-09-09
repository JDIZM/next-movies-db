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
    <section className='py-10'>
      <h2 className='mb-6 text-3xl font-bold'>Trending Movies</h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover'
                priority={index === 0 || index === 1 || index === 2}
                loading={index === 0 || index === 1 || index === 2 ? 'eager' : 'lazy'}
              />
            </div>
            <div className='p-4'>
              <h3 className='mb-2 text-lg font-semibold'>{movie.title}</h3>
              <p className='mb-2 text-sm text-gray-600'>{movie.release_date}</p>
              <div className='flex items-center'>
                <span className='mr-1 text-yellow-500'>★</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TrendingMovies;
