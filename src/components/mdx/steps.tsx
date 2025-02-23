import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

export const Steps = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    {...props}
    className={cn(
      'relative mb-12 ml-4 border-l pl-8 [counter-reset:step] [&>h3]:[counter-increment:step] [&>h3]:before:absolute [&>h3]:before:mt-[-4px] [&>h3]:before:ml-[-50px] [&>h3]:before:inline-flex [&>h3]:before:size-9 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border-4 [&>h3]:before:border-background [&>h3]:before:bg-card [&>h3]:before:text-center [&>h3]:before:-indent-px [&>h3]:before:text-base [&>h3]:before:font-medium [&>h3]:before:text-foreground [&>h3]:before:content-[counter(step)]',
      className
    )}
  >
    {children}
  </div>
);
