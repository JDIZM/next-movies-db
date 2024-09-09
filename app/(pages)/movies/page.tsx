import { FC } from 'react';
import { DisplayMovie } from '@/app/components/movies/movie/display-movie';

interface PageProperties {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page: FC<PageProperties> = async ({ params, searchParams }) => {
  const query = (searchParams.query as string) || 'jumanji';
  const page = Number(searchParams.page) || 1;

  return (
    <div className='w-full'>
      <DisplayMovie query={query} page={page} />
    </div>
  );
};

export default Page;
