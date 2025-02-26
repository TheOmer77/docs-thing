import { type ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg]:text-foreground [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        info: 'border-primary/20 bg-primary/10 [&>p:first-of-type]:text-primary [&>svg]:text-primary',
        danger:
          'border-danger/20 bg-danger/10 [&>p:first-of-type]:text-danger [&>svg]:text-danger',
      },
    },
    defaultVariants: { variant: 'info' },
  }
);

export const Alert = ({
  className,
  variant,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof alertVariants>) => (
  <div
    role='alert'
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);

export const AlertTitle = ({ className, ...props }: ComponentProps<'p'>) => (
  <p
    {...props}
    className={cn('text-base leading-none font-medium', className)}
  />
);

export const AlertDescription = ({
  className,
  ...props
}: ComponentProps<'p'>) => (
  <p {...props} className={cn('mt-2 [&_p]:leading-relaxed', className)} />
);
