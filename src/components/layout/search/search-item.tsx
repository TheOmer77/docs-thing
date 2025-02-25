import type { ComponentProps } from 'react';
import { CommandItem } from 'cmdk';

import type { Doc } from '@/types/docs';

export type SearchItemProps = ComponentProps<typeof CommandItem> & {
  doc: Doc;
  parentDoc?: Doc;
};

export const SearchItem = ({ doc, parentDoc, ...props }: SearchItemProps) => (
  <CommandItem
    className='relative flex min-h-12 flex-row items-center justify-start rounded-lg bg-mix-transparent px-4 py-2 text-base transition-[background-color] duration-100 outline-none select-none mix-with-muted-foreground *:z-10 active:duration-0 aria-selected:mix-amount-10% aria-selected:active:mix-amount-20% data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 md:min-h-10 md:text-sm'
    {...props}
  >
    <span className='relative'>
      {parentDoc && (
        <>
          <span className='text-muted-foreground'>
            {parentDoc.title}
            <span className='mx-1'>/</span>
          </span>
        </>
      )}
      {doc.title}
    </span>
  </CommandItem>
);
