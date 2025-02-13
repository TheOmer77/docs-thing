import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { LinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/cn';
import { config } from '@/constants/docs';

import { GithubIcon } from './icons';

type ConfigLink = (typeof config.links)[number];
type NavLinkProps = ConfigLink &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ConfigLink | 'children'>;

const LINK_ICONS = {
  DEFAULT: <LinkIcon />,
  github: <GithubIcon />,
};

export const NavLink = ({
  href,
  label,
  type,
  className,
  ...props
}: NavLinkProps) => {
  const icon =
    LINK_ICONS[
      type in LINK_ICONS ? (type as keyof typeof LINK_ICONS) : 'DEFAULT'
    ];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant='flat'
          size='lg'
          icon
          className={cn('md:size-10', className)}
        >
          <Link {...props} href={href as string}>
            {icon}
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

export const NavLinks = () => (
  <>
    {config.links.map(({ href, label, type }) => (
      <NavLink key={label} href={href} label={label} type={type} />
    ))}
  </>
);
