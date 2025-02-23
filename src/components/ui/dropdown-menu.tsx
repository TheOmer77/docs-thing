'use client';

import type { ComponentProps } from 'react';
import {
  CheckboxItem,
  Content,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioItem,
  Separator,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

export {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof Content>) => (
  <Portal>
    <Content
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) space-y-px overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-fade-out data-[state=open]:data-[side=bottom]:animate-scale-y-in data-[state=open]:data-[side=left]:animate-scale-x-in data-[state=open]:data-[side=right]:animate-scale-x-in data-[state=open]:data-[side=top]:animate-scale-y-in print:hidden [&>[role=group]]:space-y-px',
        className
      )}
      {...props}
    />
  </Portal>
);

export const DropdownMenuItem = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof Item> & {
  inset?: boolean;
}) => (
  <Item
    data-inset={inset}
    className={cn(
      'relative flex h-10 w-full cursor-default items-center rounded-sm px-2 text-base outline-hidden transition-[background-color] duration-100 select-none *:z-10 focus:bg-muted-foreground/10 active:bg-muted-foreground/20 active:duration-0 data-disabled:pointer-events-none data-disabled:opacity-50 md:h-8 md:text-sm',
      className
    )}
    {...props}
  />
);

export const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof CheckboxItem>) => (
  <CheckboxItem
    {...props}
    checked={checked}
    className={cn(
      'relative flex h-10 w-full cursor-default items-center rounded-sm ps-8 pe-2 text-base outline-hidden transition-[background-color] duration-100 select-none *:z-10 focus:bg-muted-foreground/10 active:bg-muted-foreground/20 active:duration-0 data-disabled:pointer-events-none data-disabled:opacity-50 md:h-8 md:text-sm',
      className
    )}
  >
    <ItemIndicator className='absolute start-2.5'>
      <CheckIcon className='size-4' />
    </ItemIndicator>
    {children}
  </CheckboxItem>
);

export const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof RadioItem>) => (
  <RadioItem
    {...props}
    className={cn(
      'relative flex h-10 w-full cursor-default items-center rounded-sm ps-8 pe-2 text-base outline-hidden transition-[background-color] duration-100 select-none *:z-10 focus:bg-muted-foreground/10 active:bg-muted-foreground/20 active:duration-0 data-disabled:pointer-events-none data-disabled:opacity-50 md:h-8 md:text-sm',
      className
    )}
  >
    <ItemIndicator className='absolute start-2.5'>
      <CircleIcon className='size-2.5 fill-current md:size-2' />
    </ItemIndicator>
    {children}
  </RadioItem>
);

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof Label> & {
  inset?: boolean;
}) => (
  <Label
    {...props}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'ps-8',
      className
    )}
  />
);

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => (
  <Separator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
);

export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    {...props}
    className={cn(
      'ml-auto text-sm tracking-widest text-muted-foreground md:text-xs',
      className
    )}
  />
);

export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof SubTrigger> & {
  inset?: boolean;
}) => (
  <SubTrigger
    {...props}
    className={cn(
      'relative flex h-10 w-full cursor-default items-center rounded-sm px-2 text-base outline-hidden transition-[background-color] duration-100 select-none *:z-10 focus:bg-muted-foreground/10 data-disabled:pointer-events-none data-disabled:opacity-50 md:h-8 md:text-sm [&:not([data-state=open])]:active:bg-muted-foreground/20 [&:not([data-state=open])]:active:duration-0',
      inset && 'ps-8',
      className
    )}
  >
    {children}
    <ChevronRightIcon className='ms-auto' />
  </SubTrigger>
);

export const DropdownMenuSubContent = ({
  className,
  ...props
}: ComponentProps<typeof SubContent>) => (
  <SubContent
    {...props}
    className={cn(
      'z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) space-y-px overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-fade-out data-[state=open]:data-[side=bottom]:animate-scale-y-in data-[state=open]:data-[side=left]:animate-scale-x-in data-[state=open]:data-[side=right]:animate-scale-x-in data-[state=open]:data-[side=top]:animate-scale-y-in print:hidden [&>[role=group]]:space-y-px',
      className
    )}
  />
);
