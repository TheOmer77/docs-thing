import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/cn';

export const ListSubheader = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cn(
      'sticky top-0 z-20 inline-block w-full select-none p-2 text-sm font-medium text-muted-foreground md:text-xs',
      className
    )}
  />
));
ListSubheader.displayName = 'ListSubheader';
