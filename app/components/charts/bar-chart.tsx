'use client';

import { useGenreDistributionQuery } from '@/lib/features/movies/moviesSlice';
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/components/charts/chart';

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
    <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
      <BarChart data={data} layout='vertical' margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
        <XAxis type='number' />
        <YAxis type='category' dataKey='name' width={80} />
        <ChartTooltip
          content={
            <ChartTooltipContent className='rounded-lg bg-gray-800 p-2 text-white shadow-lg' />
          }
        />
        <Bar dataKey='value' fill='var(--color-genreDistribution)' />
      </BarChart>
    </ChartContainer>
  );
}

export default Component;
