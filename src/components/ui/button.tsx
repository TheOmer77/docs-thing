import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

export const buttonVariants = cva(
  'inline-flex cursor-default items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[background-color,opacity] state-layer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:duration-0 disabled:pointer-events-none disabled:opacity-50 [&>*]:z-10 [&>svg]:shrink-0 [&>svg]:text-base',
  {
    variants: {
      variant: {
        default:
          'border border-input/40 bg-background shadow-sm shadow-neutral-950/10 hover:state-layer-foreground/5 active:state-layer-foreground/10 dark:bg-neutral-800',
        primary:
          'bg-primary text-primary-foreground shadow-sm shadow-primary/30 hover:state-layer-primary-foreground/10 active:state-layer-primary-foreground/25',
        flat: 'bg-transparent hover:state-layer-foreground/5 active:state-layer-foreground/10',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-5',
      },
      icon: { true: 'px-0' },
    },
    compoundVariants: [
      { icon: true, size: 'sm', className: 'w-9' },
      { icon: true, size: 'md', className: 'w-10' },
      { icon: true, size: 'lg', className: 'w-11' },
    ],
    defaultVariants: { variant: 'default', size: 'md', icon: false },
  }
);

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

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
