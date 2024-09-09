'use client';

import { useGenreDistributionQuery } from '@/lib/features/movies/moviesSlice';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer } from '@/app/components/charts/chart';

const chartConfig = {
  genreDistribution: {
    label: 'Genre Distribution',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export function Component() {
  const { data, error, isLoading } = useGenreDistributionQuery();

  if (isLoading) return <div className='py-10 text-center'>Loading...</div>;
  if (error)
    return (
      <div className='py-10 text-center text-error'>
        Error: Failed to load genre distribution data
      </div>
    );

  return (
    <ChartContainer config={chartConfig} className='min-h-[300px] w-full'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='value' fill='var(--color-genreDistribution)' />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default Component;
