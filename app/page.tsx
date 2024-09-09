'use client';
import BarChart from '@/app/components/charts/bar-chart';
import TrendingMovies from './components/movies/trending/trending-movies';
// import PopularMoviesChart from './components/movies/popular-movies-chart';
// import GenreDistributionChart from './components/charts/genre-distribution-chart';

export default function Home() {
  return (
    <>
      {/* <div className='mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left'> */}
      <div className='mb-32 grid text-center'>
        <section>
          <h4>Charts</h4>
        </section>
        <h4>Bar Chart</h4>
        <div className='flex flex-col gap-4 lg:flex-row'>
          {/* <GenreDistributionChart /> */}
          <BarChart />
        </div>
        {/* <PopularMoviesChart /> */}
        <TrendingMovies />
      </div>
    </>
  );
}
