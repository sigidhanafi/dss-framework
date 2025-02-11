import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='min-h-screen'>
          {/* Navbar */}
          <nav className='fixed top-0 left-0 right-0 bg-white flex py-4 border-b shadow-sm z-50'>
            {/* <nav className='flex bg-white p-4 shadow-sm items-center justify-center'> */}
            <div className='flex flex-row mx-auto w-3/5 justify-between'>
              <div className='text-xl font-semibold'>DSS Framework</div>
              <div className='space-x-6 text-gray-600'>
                <Link href={'/'} className='hover:text-blue-500'>
                  Home
                </Link>
                <Link href={'/topics'} className='hover:text-blue-500'>
                  Explore Topic
                </Link>
                <Link href='#' className='hover:text-blue-500'>
                  How it Work
                </Link>
                <Link href='#' className='hover:text-blue-500'>
                  Login
                </Link>
              </div>
            </div>
          </nav>
          <div className='min-h-screen'>{children}</div>

          {/* Footer */}
          <footer className='bg-blue-900 text-white text-center py-4 mt-auto'>
            <p>copyright @2025 Tugas Kuliah DSS</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
