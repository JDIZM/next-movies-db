import { FC } from 'react';
import { DisplayMovie } from '@/app/components/movies/movie/display-movie';

interface PageProperties {
  params: { id: string };
}

const Page: FC<PageProperties> = ({ params }) => {
  return (
    <div className='w-full'>
      <DisplayMovie id={params.id} page={1} />
    </div>
  );
};

export default Page;
