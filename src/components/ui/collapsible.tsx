'use client';

import type { ComponentProps } from 'react';
import { Content } from '@radix-ui/react-collapsible';

import { cn } from '@/lib/cn';

export { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible';

export const CollapsibleContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) => (
  <Content
    {...props}
    className={cn(
      'overflow-hidden data-[state=closed]:animate-collapse-out data-[state=open]:animate-collapse-in',
      className
    )}
  >
    {children}
  </Content>
);
