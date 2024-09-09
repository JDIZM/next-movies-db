import { FC } from 'react';

// Type for the params
type PageParameters = {
  id: string;
};

// Type for the blog post data
type BlogPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Props interface
interface PageProperties {
  params: PageParameters;
}

// Async function component with typed data
const Page: FC<PageProperties> = async ({ params }) => {
  const { id } = params;
  // Fetch the blog post data
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const blogPost: BlogPost = await response.json();

  return (
    <div className='w-full'>
      <h2>Movie page...</h2>
      <h2 className='mb-4 text-2xl font-bold'>{blogPost.title}</h2>
      <p>{blogPost.body}</p>
    </div>
  );
};

export default Page;
