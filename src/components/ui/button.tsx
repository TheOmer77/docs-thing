import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-[background-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:duration-0 active:mix-amount-20 disabled:pointer-events-none disabled:opacity-50 hover:[&:not(:active):not(:disabled)]:mix-amount-10 [&:not(a)]:cursor-default [&>*]:z-10 [&>svg]:shrink-0 [&>svg]:text-base',
  {
    variants: {
      variant: {
        default:
          'border shadow-sm bg-mix-background mix-with-muted-foreground dark:bg-mix-neutral-800',
        primary:
          'text-primary-foreground shadow-sm shadow-primary/30 bg-mix-primary mix-with-primary-foreground',
        flat: 'bg-mix-transparent mix-with-muted-foreground',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
      icon: { true: 'px-0' },
    },
    compoundVariants: [
      { icon: true, size: 'sm', className: 'w-8' },
      { icon: true, size: 'md', className: 'w-10' },
      { icon: true, size: 'lg', className: 'w-12' },
    ],
    defaultVariants: { variant: 'default', size: 'md', icon: false },
  }
);

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = ({
  className,
  variant,
  size,
  icon,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, icon, className }))}
      {...props}
    />
  );
};
