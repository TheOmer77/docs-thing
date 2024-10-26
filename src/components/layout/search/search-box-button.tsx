import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

export const SearchBoxButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(
      `flex h-9 w-64 select-none flex-row items-center justify-start gap-2 rounded-lg bg-card px-3 text-start text-sm text-muted-foreground ring-offset-background transition-colors duration-200 state-layer hover:state-layer-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:state-layer-muted/30 active:bg-accent active:duration-0 [&>*]:z-10 [&>svg]:text-base`,
      className
    )}
    aria-label='Search docs'
  >
    <SearchIcon />
    <span className='grow text-start'>Search docs...</span>
    <kbd className='flex h-5 flex-row items-center rounded bg-background/60 px-1.5 font-mono text-[0.625rem] uppercase dark:bg-muted/25'>
      {typeof window !== 'undefined' &&
      window.navigator.userAgent.includes('Macintosh') ? (
        <>
          <span className='me-1 text-xs'>⌘</span>K
        </>
      ) : (
        'CTRL K'
      )}
    </kbd>
  </button>
));
SearchBoxButton.displayName = 'SearchBoxButton';
