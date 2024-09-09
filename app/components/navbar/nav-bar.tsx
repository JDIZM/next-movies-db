'use client';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/app/components/theme/theme-toggle';
import Link from 'next/link';
import SearchBar from '../search/search-bar';
import { Suspense, useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  console.log('pathname..', pathname);

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    // TODO 650 is what we want.
    if (window.innerWidth < 768) {
      console.log('isMobile..', true);
      setIsMobile(true);
      return;
    }
    console.log('isMobile..', false);
    setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      setIsMobile(false);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // return (
  //   <nav className='navbar m-auto w-full max-w-5xl items-center justify-between bg-base-100 font-mono'>
  //     <div className='flex-1'>
  //       <Link className='btn btn-ghost text-xl' href='/'>
  //         Movies DB
  //       </Link>
  //     </div>
  //     <div className='flex-none'>
  //       {/* TODO search bar needs to be below on mobile. */}
  //       {isMobile ? undefined : <SearchBar />}
  //       <span className='px-2' />
  //       <ThemeToggle />
  //       <ul className='menu menu-horizontal px-1'>
  //         <li>
  //           <Link href='/'>Link</Link>
  //         </li>
  //         <li>
  //           <details>
  //             <summary>Parent</summary>
  //             <ul className='rounded-t-none bg-base-100 p-2'>
  //               <li>
  //                 <Link href='/'>Link 1</Link>
  //               </li>
  //               <li>
  //                 <Link href='/'>Link 2</Link>
  //               </li>
  //             </ul>
  //           </details>
  //         </li>
  //       </ul>
  //     </div>
  //     <div className='flex-wrap'>{isMobile ? <SearchBar /> : undefined}</div>
  //   </nav>
  // );
  return (
    <nav className='navbar m-auto w-full max-w-5xl flex-wrap items-center justify-between bg-base-100 font-mono'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl' href='/'>
          Movies DB
        </Link>
      </div>

      <div className='flex-none'>
        {/* Desktop search bar (hidden on mobile) */}
        <div className='hidden items-center sm:flex'>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
          <span className='px-2' />
          <ThemeToggle />
          {/* <ul className='menu menu-horizontal px-1'>
            <li>
              <Link href='/'>Link</Link>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className='rounded-t-none bg-base-100 p-2'>
                  <li>
                    <Link href='/'>Link 1</Link>
                  </li>
                  <li>
                    <Link href='/'>Link 2</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul> */}
        </div>
      </div>

      {/* Mobile-specific search bar */}
      <div className='mt-4 w-full sm:hidden'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
      </div>
    </nav>
  );
}

export default Navbar;
