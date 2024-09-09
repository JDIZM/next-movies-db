'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

export const Search = () => {
  const [search, setSearch] = useState('');
  // const [results, setResults] = useState([]);
  const router = useRouter();
  const searchParameters = useSearchParams();

  const query = searchParameters.get('query');

  useEffect(() => {
    if (query) {
      setSearch(query);
      console.log('set search..', query);
    }
  }, [query]);

  console.log('router..', router);
  console.log('searchParameters..', searchParameters);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log('Current value:', value); // Log the value to check if "." is added after multiple spaces
    setSearch(value); // Directly set the value without trimming
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log('search..', search);
    // const response = await fetch(`/api/movies?query=${search}`);
    // const data = await response.json();
    // console.log('data..', data);
    // setResults(data.results);
    // TODO push query params to /movies route or current route.å
    router.push(`/movies?query=${search}`);
  };

  return (
    // <div className='flex h-screen items-center justify-center'>
    <form action='' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Search movies..'
        className='input input-bordered w-full max-w-xs'
        value={search}
        onChange={onChange}
        autoCorrect='off'
        autoComplete='off'
        spellCheck='false'
      />
    </form>
    // </div>
  );
};

export default Search;
