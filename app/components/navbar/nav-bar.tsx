'use client';
import ThemeToggle from '@/app/components/theme/theme-toggle';
import Link from 'next/link';
import SearchBar from '../search/search-bar';
import { Suspense } from 'react';

export function Navbar() {
  return (
    <nav className='navbar m-auto w-full max-w-5xl flex-wrap items-center justify-between bg-base-100 font-mono'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl' href='/'>
          Movies DB
        </Link>
      </div>

      <div className='shrink-1 max-w-[200px] md:max-w-xs'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
        <span className='px-2' />
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
