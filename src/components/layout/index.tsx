'use client';

import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';
import { allDocs, notFoundPageName, specialFileNames } from '@/constants/docs';

import { Nav } from './nav';
import { Sidebar } from './sidebar';

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const currentDoc = allDocs
      .filter(doc => !specialFileNames.includes(doc._meta.path))
      .find(doc => doc.url === pathname),
    notFoundDoc = allDocs.find(doc => doc._meta.path === notFoundPageName);

  return (
    <>
      <Sidebar />
      <Nav />

      <main
        className={cn(
          'grow px-4 pt-16',
          (currentDoc || notFoundDoc)?.showSidebar && 'md:ps-[21rem]'
        )}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
