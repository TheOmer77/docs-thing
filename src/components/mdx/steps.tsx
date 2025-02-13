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
      'relative mb-12 ml-4 border-l pl-8 [counter-reset:step] [&>h3]:[counter-increment:step] before:[&>h3]:absolute before:[&>h3]:ml-[-50px] before:[&>h3]:mt-[-4px] before:[&>h3]:inline-flex before:[&>h3]:size-9 before:[&>h3]:items-center before:[&>h3]:justify-center before:[&>h3]:rounded-full before:[&>h3]:border-4 before:[&>h3]:border-background before:[&>h3]:bg-card before:[&>h3]:text-center before:[&>h3]:-indent-px before:[&>h3]:text-base before:[&>h3]:font-medium before:[&>h3]:text-foreground before:[&>h3]:content-[counter(step)]',
      className
    )}
  >
    {children}
  </div>
);
