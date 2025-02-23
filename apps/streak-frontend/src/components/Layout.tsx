import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (     
    <div className="bg-streak-yellow-primary h-screen">
      <div className='flex justify-center items-center h-14'>
          <h1 className='text-streak-purple-secondary font-bold'>ahead</h1>
      </div>
      <main>
        { children }
      </main>
    </div>
  );
};