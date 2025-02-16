import {
  Dialog as DialogRoot,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  type DialogProps,
  DialogTitle,
} from '@radix-ui/react-dialog';

import { SearchCommand } from './search-command';

export const SearchDialog = ({ open, onOpenChange, children }: DialogProps) => (
  <DialogRoot open={open} onOpenChange={onOpenChange}>
    <DialogPortal>
      <DialogOverlay className='fixed inset-0 z-50 bg-neutral-950/50 duration-300 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in print:hidden' />
      <DialogContent
        className='fixed start-1/2 top-4 z-50 grid w-[calc(100%-2rem)] max-w-screen-sm -translate-x-1/2 gap-4 rounded-lg bg-popover text-card-foreground shadow-lg shadow-neutral-950/20 transition-none duration-300 ease-out [--zoom-translate-x:-50%] focus-visible:outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in sm:top-[min(40%,theme(spacing.40))] rtl:translate-x-1/2 rtl:[--zoom-translate-x:50%] print:hidden'
        aria-describedby={undefined}
      >
        <DialogTitle className='sr-only'>Search docs...</DialogTitle>
        <SearchCommand>{children}</SearchCommand>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
);
