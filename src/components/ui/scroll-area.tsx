'use client';

import { type ComponentProps } from 'react';
import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport,
} from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/cn';

export const ScrollBarScrollbar = ({
  orientation = 'vertical',
  className,
  style,
  ...props
}: ComponentProps<typeof Scrollbar>) => (
  <Scrollbar
    orientation={orientation}
    // Override default style, which takes priority over classnames
    style={{ left: 'auto', right: 'auto', insetInlineEnd: 0, ...style }}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-px',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-px',
      className
    )}
    {...props}
  >
    <Thumb className='relative flex-1 rounded-full bg-border' />
  </Scrollbar>
);

export const ScrollArea = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Root>) => (
  <Root
    {...props}
    className={cn('relative overflow-hidden [direction:inherit]', className)}
  >
    <Viewport className='size-full rounded-[inherit]'>{children}</Viewport>
    <ScrollBarScrollbar />
    <Corner />
  </Root>
);
