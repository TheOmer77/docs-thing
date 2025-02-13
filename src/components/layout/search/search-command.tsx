import type { ComponentProps } from 'react';
import { CommandEmpty, CommandInput, CommandList, CommandRoot } from 'cmdk';
import { SearchIcon } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';

export const SearchCommand = ({
  children,
  ...props
}: ComponentProps<typeof CommandRoot>) => (
  <CommandRoot
    className='flex size-full flex-col overflow-hidden rounded-lg'
    {...props}
  >
    <div className='relative flex items-center border-b'>
      <SearchIcon className='absolute start-4 me-2 size-4 shrink-0 text-muted-foreground' />
      <CommandInput
        placeholder='Search docs...'
        className='flex h-12 w-full rounded-lg bg-transparent px-3 ps-10 text-base text-foreground outline-none placeholder:text-muted-foreground md:h-11 md:text-sm'
      />
    </div>
    <ScrollArea className='max-h-80 overflow-y-auto overflow-x-hidden [direction:inherit]'>
      <CommandList className='p-2'>
        <CommandEmpty className='py-6 text-center text-sm text-muted-foreground'>
          No results found.
        </CommandEmpty>
        {children}
      </CommandList>
    </ScrollArea>
  </CommandRoot>
);
