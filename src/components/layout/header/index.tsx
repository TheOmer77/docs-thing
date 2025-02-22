import { Suspense, useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { Search } from '@/components/layout/search';
import { useDoc } from '@/hooks/use-doc';
import { useIsClient } from '@/hooks/use-is-client';
import { useModal } from '@/hooks/use-modal';
import { cn } from '@/lib/cn';

import { NavLinks } from './links';
import { ThemeMenu } from './theme-menu';

const NavDrawerButton = () => {
  const { openModal } = useModal();
  return (
    <Button
      variant='flat'
      size='lg'
      icon
      className='ms-2 sm:ms-4 md:hidden print:hidden'
      aria-label='Open sidebar'
      onClick={() => openModal('nav-drawer')}
    >
      <MenuIcon />
    </Button>
  );
};

export const Header = () => {
  const doc = useDoc();
  const isClient = useIsClient();
  const [isScrollTop, setIsScrollTop] = useState(true);

  useEffect(() => {
    const scrollListener = () => {
      const currIsScrollTop = window.scrollY < 1;
      if (currIsScrollTop !== isScrollTop) setIsScrollTop(currIsScrollTop);
    };

    scrollListener();
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [isScrollTop]);

  return (
    <header
      className={cn(
        'fixed start-1/2 top-0 z-20 mx-auto flex h-16 w-full max-w-8xl -translate-x-1/2 flex-row items-center justify-between transition-[background-color] rtl:translate-x-1/2 print:static print:block print:h-auto print:translate-x-0',
        !isScrollTop && isClient && 'bg-background',
        doc?.showSidebar && 'md:bg-transparent'
      )}
    >
      <Suspense>
        <NavDrawerButton />
      </Suspense>
      <Logo
        /* Setting `display: none` breaks SVG gradients in the logo, so using 
        a different method for hiding on mobile */
        className='invisible absolute md:visible md:relative md:h-16 print:visible print:relative print:h-auto print:w-full print:p-0'
      />
      <nav
        className={cn(
          'flex h-full grow flex-row items-center justify-end px-2 transition-[background-color] sm:px-4 print:hidden',
          doc?.showSidebar && !isScrollTop && 'md:bg-background'
        )}
      >
        <Search />
        <NavLinks />
        <ThemeMenu />
      </nav>
    </header>
  );
};
