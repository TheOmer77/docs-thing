import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';
import { config } from '@/constants/docs';

import { SidebarLink } from './sidebar/sidebar-link';

export const Logo = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'header'>) => (
  <header
    {...props}
    className={cn(`flex h-16 flex-row items-center px-4 md:w-80`, className)}
  >
    <SidebarLink
      href='/'
      className='text-2xl font-bold tracking-tight text-primary'
    >
      {config.title}
    </SidebarLink>
  </header>
);
