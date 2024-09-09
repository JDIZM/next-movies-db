import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreProvider } from './store-provider';
import Navbar from './components/navbar/nav-bar';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies DB',
  description: 'Created by Blazingly Fast',
};

// https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Wrapping the entire page in a client only store provider is not forcing csr, nested components are still server rendered if
    // they are not using 'use client'.
    <StoreProvider>
      <html lang='en' data-test='123'>
        <body className={inter.className}>
          <Navbar />
          <main className='flex min-h-screen flex-col items-center justify-between p-4 md:p-24'>
            {children}
          </main>
          <footer className='flex flex-col items-center p-2'>&copy; 2024 Blazingly Fast</footer>
        </body>
      </html>
    </StoreProvider>
  );
}
