'use client';
import { useGenreDistributionQuery } from '@/lib/features/movies/moviesSlice';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/charts/chart';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#A4DE6C',
  '#D0ED57',
  '#FFA07A',
];

const chartConfig = {
  genreDistribution: {
    label: 'Genre Distribution',
    color: '#2563eb',
  },
};

export function GenreDistributionChart() {
  const { data, error, isLoading } = useGenreDistributionQuery();

  if (isLoading) return <div className='py-10 text-center'>Loading...</div>;
  if (error)
    return (
      <div className='py-10 text-center text-error'>
        Error: Failed to load genre distribution data
      </div>
    );

  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[300px] w-full max-w-[300px] md:max-w-full'
    >
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius='80%'
          fill='var(--color-genreDistribution)'
          dataKey='value'
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          className='text-white'
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip
          content={
            <ChartTooltipContent className='rounded-lg bg-gray-800 p-2 text-white shadow-lg' />
          }
        />
      </PieChart>
    </ChartContainer>
  );
}

export default GenreDistributionChart;
