'use client';
import { FC } from 'react';
import { DisplayMovie } from '@/app/components/movies/movie/display-movie';
import { useParams } from 'next/navigation';

const Page: FC = () => {
  const { id } = useParams();

  return (
    <div className='w-full'>
      <DisplayMovie query={id as string} page={1} />
    </div>
  );
};

export default Page;
