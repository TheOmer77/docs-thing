'use client';

import type { PropsWithChildren } from 'react';

import { useDoc } from '@/hooks/use-doc';
import { cn } from '@/lib/cn';

import { Header } from './header';
import { Sidebar } from './sidebar';

const Layout = ({ children }: PropsWithChildren) => {
  const doc = useDoc();

  return (
    <>
      <Header />

      <div
        className={cn(
          'relative mx-auto grid max-w-8xl grow grid-cols-1 pt-16 [--sidebar-width:theme(spacing.80)] [--toc-width:theme(spacing.72)] print:block print:grid-cols-1 print:p-0',
          doc?.showSidebar && 'md:grid-cols-[var(--sidebar-width)_1fr]',
          doc?.showToc && 'xl:grid-cols-[1fr,var(--toc-width)]',
          doc?.showSidebar &&
            doc.showToc &&
            'xl:grid-cols-[var(--sidebar-width)_1fr,var(--toc-width,0)]'
        )}
      >
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
