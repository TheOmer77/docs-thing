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
      'inline-flex h-10 items-center justify-center gap-1 rounded-md bg-secondary p-1 text-muted-foreground',
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
      'inline-flex cursor-default select-none items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-100 state-layer hover:state-layer-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-foreground/10 active:duration-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm active:data-[state=active]:bg-neutral-100 dark:active:data-[state=active]:bg-neutral-900',
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
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
);
