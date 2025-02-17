import { Suspense } from 'react';
import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { Search } from '@/components/layout/search';
import { useDoc } from '@/hooks/use-doc';
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
  return (
    <header
      className={cn(
        'fixed start-1/2 top-0 z-20 mx-auto flex h-16 w-full max-w-8xl -translate-x-1/2 flex-row items-center justify-between rtl:translate-x-1/2 print:static print:block print:h-auto print:translate-x-0',
        doc && 'bg-background', // Transparent nav on home page
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
          'flex h-full grow flex-row items-center justify-end px-2 sm:px-4 print:hidden',
          doc?.showSidebar && 'md:bg-background'
        )}
      >
        <Search />
        <NavLinks />
        <ThemeMenu />
      </nav>
    </header>
  );
};
