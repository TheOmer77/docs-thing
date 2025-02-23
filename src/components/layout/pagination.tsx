'use client';

import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDoc } from '@/hooks/use-doc';
import { cn } from '@/lib/cn';
import { allDocs } from '@/constants/docs';
import type { Doc } from '@/types/docs';

type PaginationLinkProps = {
  type: 'next' | 'prev';
  doc: Doc;
};

const PaginationLink = ({ type, doc }: PaginationLinkProps) => (
  <Button
    className={cn(
      'not-prose block h-auto space-y-1 rounded-lg p-4',
      type === 'next'
        ? 'col-start-2 items-end text-end'
        : 'items-start text-start'
    )}
    asChild
  >
    <Link href={doc.url}>
      <div
        className={cn(
          'flex flex-row items-center gap-2 text-sm font-normal text-muted-foreground',
          type === 'next' ? 'justify-end' : 'justify-start'
        )}
      >
        {type === 'prev' && <ChevronLeftIcon className='size-4' />}
        {type === 'next' ? 'Next' : 'Previous'}
        {type === 'next' && <ChevronRightIcon className='size-4' />}
      </div>
      <div className='text-base tracking-tight'>{doc.title}</div>
    </Link>
  </Button>
);

export const Pagination = () => {
  const doc = useDoc();
  if (!doc) return null;

  const docIdx = allDocs.findIndex(({ _id }) => _id === doc._id);
  const prevDoc = allDocs[docIdx - 1],
    nextDoc = allDocs[docIdx + 1];

  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-[100vw] grid-cols-2 gap-2 self-end px-4 pb-8 [print-color-adjust:exact] md:max-w-[min(calc(100vw-22rem),var(--container-2xl))] print:hidden',
        doc?.showSidebar && [
          'md:col-start-2 lg:max-w-[min(calc(100vw-22rem),var(--container-2xl))]',
          !doc?.showToc &&
            'xl:max-w-[min(calc(100vw-22rem),var(--container-3xl))]',
        ]
      )}
    >
      {prevDoc && <PaginationLink type='prev' doc={prevDoc} />}
      {nextDoc && <PaginationLink type='next' doc={nextDoc} />}
    </div>
  );
};
