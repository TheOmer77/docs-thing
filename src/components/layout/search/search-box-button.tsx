import type { ComponentProps } from 'react';
import { SearchIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

export const SearchBoxButton = ({
  disabled,
  className,
  ...props
}: ComponentProps<'button'>) => (
  <button
    {...props}
    disabled={disabled}
    className={cn(
      'group me-2 flex h-9 w-64 flex-row items-center justify-start gap-2 rounded-lg bg-mix-card px-3 text-start text-sm text-muted-foreground ring-offset-background transition-colors select-none mix-with-muted-foreground *:z-10 hover:mix-amount-10% focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-hidden focus-visible:mix-amount-10% active:duration-0 active:mix-amount-20% disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4',
      className
    )}
    aria-label='Search docs'
  >
    <SearchIcon />
    <span className='grow text-start'>Search docs...</span>
    {!disabled && (
      <kbd className='flex h-5 flex-row items-center rounded bg-background/60 px-1.5 font-mono text-[0.625rem] uppercase group-disabled:hidden dark:bg-muted/25'>
        {typeof window !== 'undefined' &&
        window.navigator.userAgent.includes('Macintosh') ? (
          <>
            <span className='me-1 text-xs'>⌘</span>K
          </>
        ) : (
          'CTRL K'
        )}
      </kbd>
    )}
  </button>
);
