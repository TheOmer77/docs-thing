'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

import { ListItem, ListItemIcon, ListItemText } from '@/components/ui';
import { ChevronRightIcon } from 'lucide-react';
import { allDocs } from '@/constants/contentlayer';
import type { Doc } from '@/types';

interface SidebarItemProps {
  doc: Doc;
  active?: boolean;
  childActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  doc,
  active = false,
  childActive = false,
  onClick,
}: SidebarItemProps) => {
  const children = useMemo(
    () =>
      allDocs.filter(childDoc =>
        childDoc._raw.flattenedPath.startsWith(`${doc._raw.flattenedPath}/`)
      ),
    [doc._raw.flattenedPath]
  );

  return (
    <ListItem
      asChild
      key={doc._id}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <Link href={doc.url}>
        <ListItemText primary={doc.title} />
        {children.length > 0 && (
          <ListItemIcon
            className={cn(
              'transition-transform duration-300',
              (active || childActive) && 'rotate-90'
            )}
          >
            <ChevronRightIcon />
          </ListItemIcon>
        )}
      </Link>
    </ListItem>
  );
};
