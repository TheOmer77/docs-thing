'use client';

import type { ComponentProps } from 'react';
import { Content, List, Trigger } from '@radix-ui/react-tabs';

import { cn } from '@/lib/cn';

export { Tabs } from '@radix-ui/react-tabs';

export const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof List>) => (
  <List
    className={cn(
      'inline-flex h-10 items-center justify-center gap-1 rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof Trigger>) => (
  <Trigger
    className={cn(
      'inline-flex cursor-default items-center justify-center rounded-sm bg-mix-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-100 select-none mix-with-muted-foreground hover:mix-amount-10% focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden active:bg-muted-foreground/20 active:duration-0 active:mix-amount-20% disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-mix-background data-[state=active]:text-foreground data-[state=active]:shadow-xs',
      className
    )}
    {...props}
  />
);

export const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof Content>) => (
  <Content
    className={cn(
      'mt-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden',
      className
    )}
    {...props}
  />
);
