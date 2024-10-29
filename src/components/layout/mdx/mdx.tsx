'use client';

import { MDXContent } from '@content-collections/mdx/react';

import { ErrorLayout } from '@/components/layout/error';
import { HomeLayout } from '@/components/layout/home';
import { cn } from '@/lib/cn';
import type { Doc } from '@/types/docs';

import { Alert } from './alert';
import { MdxBlockquote } from './mdx-blockquote';
import { MdxLink } from './mdx-link';

export const mdxComponents = {
  a: MdxLink,
  blockquote: MdxBlockquote,
  Alert,

  HomeLayout,
  ErrorLayout,
};

export type MDXProps = { doc: Doc };

export const MDX = ({ doc }: MDXProps) => (
  <div
    className={cn(
      `prose mx-auto max-w-[calc(100vw-2rem)] py-8 dark:prose-invert`,
      doc.showSidebar && 'md:max-w-[calc(100vw-22rem)] lg:max-w-3xl'
    )}
  >
    {doc.title && doc.showTitle && (
      <h1 className='text-5xl font-extrabold tracking-tight sm:text-[3.5rem]'>
        {doc.title}
      </h1>
    )}
    <MDXContent code={doc.body.code} components={mdxComponents} />
  </div>
);

export default MDX;
