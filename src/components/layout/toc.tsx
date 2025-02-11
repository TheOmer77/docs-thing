'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';

import { useDoc } from '@/hooks/use-doc';
import { cn } from '@/lib/cn';

export const Toc = () => {
  const doc = useDoc();
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const visibleEntry = entries.find(entry => entry.isIntersecting);
    if (visibleEntry) setActiveId(visibleEntry.target.id);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20px 0px 0px 0px',
      threshold: 0.1,
    });

    const elements = (doc?.headings || [])
      .map(({ slug }) => slug && document.getElementById(slug))
      .filter(Boolean) as HTMLElement[];
    elements.forEach(el => {
      if (observer.current) observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [doc?.headings]);

  if (!doc || doc.headings.length < 0) return null;

  const lowestLevel = Math.min(
    ...(doc?.headings.map(({ level }) => level).filter(Boolean) as number[])
  );

  return (
    <div className='sticky top-24 mt-8 hidden self-start pe-8 ps-4 xl:block print:hidden'>
      <h3 className='mb-4 font-bold'>On this page</h3>
      <ul
        className='space-y-2 text-sm'
        style={{ '--lowest-level': lowestLevel } as CSSProperties}
      >
        {doc?.headings.map(({ level, slug, text }) => (
          <li
            key={slug}
            className='ps-[calc(theme(spacing.4)*(var(--level,1)-var(--lowest-level,1)))]'
            style={{ '--level': level } as CSSProperties}
          >
            <a
              href={`#${slug}`}
              className={cn(
                'text-muted-foreground transition-[color] hover:text-foreground',
                activeId === slug && 'font-medium text-foreground'
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
