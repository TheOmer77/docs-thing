import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/cn';

type CardProps = ComponentProps<'div'> & { asChild?: boolean };

export const Card = ({ asChild, className, ...props }: CardProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...props}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
    />
  );
};

export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div {...props} className={cn('flex flex-col space-y-1.5 p-6', className)} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    {...props}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
  />
);

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div {...props} className={cn('text-sm text-muted-foreground', className)} />
);

export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div {...props} className={cn('p-6 pt-0', className)} />
);

export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div {...props} className={cn('flex items-center p-6 pt-0', className)} />
);
