import { notFound } from 'next/navigation';

import { MDX } from '@/components/layout/mdx';
import { allDocs, specialFileNames } from '@/constants/docs';

export const generateStaticParams = async () =>
  allDocs.map(doc => ({ slug: doc.url.split('/').slice(1) }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const slug = (await params).slug || [];
  const doc = allDocs
    .filter(doc => !specialFileNames.includes(doc._meta.path))
    .find(doc => doc.url === `/${slug.join('/')}`);

  if (!doc?.title) return {};
  return { title: doc.title };
};

const DocPage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const slug = (await params).slug || [];
  const doc = allDocs
    .filter(doc => !specialFileNames.includes(doc._meta.path))
    .find(doc => doc.url === `/${slug.join('/')}`);
  if (!doc) return notFound();

  return <MDX doc={doc} />;
};

export default DocPage;
