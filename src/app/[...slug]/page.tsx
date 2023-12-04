import { notFound } from 'next/navigation';

import { Mdx } from 'components/layout/Mdx';
import { allDocs } from 'constants/contentlayer';

export const generateStaticParams = async () =>
  allDocs.map(doc => ({ slug: doc._raw.flattenedPath.split('/') }));

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const doc = allDocs.find(
    doc => doc._raw.flattenedPath === params.slug.join('/')
  );
  return { title: doc?.title };
};

const DocLayout = ({ params }: { params: { slug: string[] } }) => {
  const doc = allDocs.find(
    doc => doc._raw.flattenedPath === params.slug.join('/')
  );
  if (!doc) return notFound();

  return <Mdx doc={doc} />;
};

export default DocLayout;
