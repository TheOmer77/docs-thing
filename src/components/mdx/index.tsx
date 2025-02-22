'use client';

import Link from 'next/link';
import { MDXContent } from '@content-collections/mdx/react';

import { useDoc } from '@/hooks/use-doc';
import { cn } from '@/lib/cn';
import type { Doc } from '@/types/docs';

import { MdxBlockquote } from './blockquote';
import { Card, Cards } from './cards';
import { CodeBlock } from './code-block';
import { h1, h2, h3, h4 } from './heading';
import { Steps } from './steps';
import { Tab, Tabs } from './tabs';

export const mdxComponents = {
  h1,
  h2,
  h3,
  h4,
  a: Link,
  blockquote: MdxBlockquote,
  pre: CodeBlock,
  Cards,
  Card,
  Steps,
  Tabs,
  Tab,
};

export type MDXProps = { doc: Doc };

export const MDX = () => {
  const doc = useDoc();
  return (
    <main
      className={cn(
        `prose mx-auto w-full max-w-[100vw] px-4 py-8 [print-color-adjust:exact] dark:prose-invert md:max-w-[min(calc(100vw-22rem),theme(maxWidth.2xl))] print:max-w-none print:px-0`,
        doc?.showSidebar && [
          'md:col-start-2 lg:max-w-[min(calc(100vw-22rem),theme(maxWidth.2xl))]',
          !doc?.showToc &&
            'xl:max-w-[min(calc(100vw-22rem),theme(maxWidth.3xl))]',
        ]
      )}
    >
      {doc?.showTitle && (
        <>
          {doc.title && (
            <h1 className='mb-14 text-5xl font-extrabold tracking-tight sm:text-6xl'>
              {doc.title}
            </h1>
          )}
          {doc.description && (
            /* eslint-disable-next-line tailwindcss/no-custom-classname */
            <p className='lead -mt-8 mb-14'>{doc.description}</p>
          )}
        </>
      )}
      <MDXContent code={doc?.body.code || ''} components={mdxComponents} />
    </main>
  );
};
