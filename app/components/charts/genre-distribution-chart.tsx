'use client';
import { useGenreDistributionQuery } from '@/lib/features/movies/moviesSlice';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer } from '@/app/components/charts/chart';

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
    color: 'hsl(var(--p))',
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
    <section className='py-10'>
      <h2 className='mb-6 text-3xl font-bold'>Genre Distribution</h2>
      <ChartContainer
        config={chartConfig}
        className='aspect-[16/9] w-full rounded-box bg-base-200 p-4'
      >
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </section>
  );
}

export default GenreDistributionChart;
