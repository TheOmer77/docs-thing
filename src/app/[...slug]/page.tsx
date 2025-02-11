import { notFound } from 'next/navigation';

import { Toc } from '@/components/layout/toc';
import { MDX } from '@/components/mdx';
import { allDocs } from '@/constants/docs';

export const generateStaticParams = async () =>
  allDocs.map(doc => ({ slug: doc.url.split('/').slice(1) }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const slug = (await params).slug || [];
  const doc = allDocs.find(doc => doc.url === `/${slug.join('/')}`);

  if (!doc?.title) return {};
  return { title: doc.title };
};

const DocPage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const slug = (await params).slug || [];
  const doc = allDocs.find(doc => doc.url === `/${slug.join('/')}`);
  if (!doc) return notFound();

  return (
    <>
      <MDX />
      {doc.showToc && <Toc />}
    </>
  );
};

export default DocPage;
