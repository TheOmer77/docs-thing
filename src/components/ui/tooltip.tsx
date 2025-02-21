'use client';

import type { ComponentProps } from 'react';
import { Content } from '@radix-ui/react-tooltip';

import { cn } from '@/lib/cn';

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

const SIDE_OFFSET = 4;

export type TooltipContentProps = Omit<
  ComponentProps<typeof Content>,
  'sideOffset'
>;

export const TooltipContent = ({
  className,
  ...props
}: ComponentProps<typeof Content>) => (
  <Content
    {...props}
    className={cn(
      'z-[60] select-none rounded-lg bg-popover p-2 text-xs leading-none text-popover-foreground shadow-sm will-change-[transform,opacity] data-[state=closed]:animate-tooltip-out data-[state=delayed-open]:animate-tooltip-in data-[state=instant-open]:animate-tooltip-in data-[side=right]:[--slide-translate-origin-x:-2px] data-[side=left]:[--slide-translate-origin-x:2px] data-[side=bottom]:[--slide-translate-origin-y:-2px] data-[side=top]:[--slide-translate-origin-y:2px] print:hidden',
      className
    )}
    sideOffset={SIDE_OFFSET}
  />
);
