import type { ComponentProps, PropsWithChildren } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card as CardRoot,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/cn';

export const Cards = ({ children }: PropsWithChildren) => (
  <div className='not-prose grid gap-4 md:grid-cols-2'>{children}</div>
);

type CardProps = ComponentProps<typeof Link> & {
  title: string;
  description?: string;
};

export const Card = ({
  title,
  description,
  className,
  ...props
}: CardProps) => (
  <CardRoot
    asChild
    className={cn(
      'flex h-auto cursor-pointer flex-col items-start space-y-1.5 p-4 no-underline',
      className
    )}
  >
    <Button asChild>
      <Link {...props}>
        <CardTitle className='text-lg'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </Link>
    </Button>
  </CardRoot>
);
