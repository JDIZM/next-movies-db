'use client';
import BarChart from '@/app/components/charts/bar-chart';
import TrendingMovies from './components/movies/trending/trending-movies';
import GenreDistributionChart from './components/charts/genre-distribution-chart';

export default function Home() {
  return (
    <>
      <div className='mb-32 grid text-center'>
        <h4 className='text-lg font-bold lg:text-2xl'>Distribution of movies by genre</h4>
        <div className='flex flex-col items-center gap-4 lg:flex-row'>
          <BarChart />
          <GenreDistributionChart />
        </div>
        <TrendingMovies />
      </div>
    </>
  );
}
