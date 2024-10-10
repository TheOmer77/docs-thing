import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { CommandItem } from 'cmdk';

import type { Doc } from '@/types';

export type SearchItemProps = ComponentPropsWithoutRef<typeof CommandItem> & {
  doc: Doc;
  parentDoc?: Doc;
};

export const SearchItem = forwardRef<
  ElementRef<typeof CommandItem>,
  SearchItemProps
>(({ doc, parentDoc, ...props }, ref) => (
  <CommandItem
    ref={ref}
    className='relative flex min-h-12 cursor-default select-none flex-row items-center justify-start rounded-lg px-4 py-2 text-base outline-none transition-[background-color] duration-100 state-layer active:duration-0 aria-selected:state-layer-muted/30 aria-selected:active:bg-muted/30 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 md:min-h-10 md:text-sm [&>*]:z-10'
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
));
SearchItem.displayName = 'SearchItem';
