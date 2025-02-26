import {
  Dialog as DialogRoot,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  type DialogProps,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { SearchCommand } from './search-command';

export const SearchDialog = ({ open, onOpenChange, children }: DialogProps) => (
  <DialogRoot open={open} onOpenChange={onOpenChange}>
    <DialogPortal>
      <DialogOverlay className='fixed inset-0 z-50 bg-neutral-950/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in print:hidden' />
      <DialogContent
        className='fixed start-1/2 top-4 z-50 grid w-[calc(100%-2rem)] max-w-(--breakpoint-sm) -translate-x-1/2 gap-4 rounded-lg bg-popover text-card-foreground shadow-lg transition-none [--zoom-translate-x:-50%] focus-visible:outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in sm:top-[min(40%,--spacing(40))] rtl:translate-x-1/2 rtl:[--zoom-translate-x:50%] print:hidden'
        aria-describedby={undefined}
      >
        <DialogTitle className='sr-only'>Search docs...</DialogTitle>
        <SearchCommand>{children}</SearchCommand>
        <DialogClose asChild>
          <Button icon variant='flat' className='absolute end-2 top-1'>
            <XIcon />
          </Button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
);
