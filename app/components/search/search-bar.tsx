'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

export const Search = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const searchParameters = useSearchParams();

  const query = searchParameters.get('query');

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, [query]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    router.push(`/movies?query=${search}`);
  };

  return (
    <form action='' onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='Search movies..'
        className='md:text-md input input-bordered w-full max-w-[200px] text-sm'
        value={search}
        onChange={onChange}
        autoCorrect='off'
        autoComplete='off'
        spellCheck='false'
      />
    </form>
  );
};

export default Search;
