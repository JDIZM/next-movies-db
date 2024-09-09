'use client';
import { usePopularMoviesOverTimeQuery } from '@/lib/features/movies/moviesSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/app/components/charts/chart';

const chartConfig = {
  avgPopularity: {
    label: 'Average Popularity',
    color: 'hsl(var(--p))',
  },
};

export function PopularMoviesChart() {
  const startDate = '2024-01-01';
  const endDate = '2024-03-31';
  const { data, error, isLoading } = usePopularMoviesOverTimeQuery({ startDate, endDate });

  if (isLoading) return <div className='py-10 text-center'>Loading...</div>;
  if (error)
    return (
      <div className='py-10 text-center text-error'>Error: Failed to load popular movies data</div>
    );

  return (
    <section className='py-10'>
      <h2 className='mb-6 text-3xl font-bold'>Popular Movies Over Time</h2>
      <ChartContainer
        config={chartConfig}
        className='min-h-[200px] w-full rounded-box bg-base-200 p-4'
      >
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--bc) / 0.2)' />
          <XAxis
            dataKey='month'
            allowDuplicatedCategory={false}
            interval='preserveStartEnd'
            tickLine={true}
            axisLine={true}
            stroke='hsl(var(--bc))'
          />
          <YAxis stroke='hsl(var(--bc))' />
          <ChartTooltip />
          <Line
            type='monotone'
            dataKey='avgPopularity'
            stroke='var(--color-avgPopularity)'
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8, fill: 'var(--color-avgPopularity)' }}
          />
        </LineChart>
      </ChartContainer>
    </section>
  );
}

export default PopularMoviesChart;
