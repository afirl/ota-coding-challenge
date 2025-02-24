import Head from 'next/head';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (     
    <>
      <Head>
        <title>OTA Coding Challenge</title>
      </Head>
      <div className="flex flex-col bg-streak-yellow-primary h-screen">
        <div className='flex justify-center items-center h-14'>
            <h1 className='text-streak-purple-secondary font-bold'>ahead</h1>
        </div>
        <main className="flex h-[-webkit-fill-available]">
          { children }
        </main>
        <div className="flex justify-between absolute bottom-0 w-full">
          <img src="/img/bg-element.png" alt="bg element left" />
          <img src="/img/bg-element.png" className="transform scale-x-[-1]" alt="bg element left" />
        </div>
      </div>
    </>
  );
};