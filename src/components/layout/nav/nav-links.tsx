import { getMDXComponent } from 'next-contentlayer2/hooks';

import { NavLink } from './nav-link';
import { mdxComponents } from '../mdx';
import { allDocs, navLinksName } from '@/constants/contentlayer';

export const NavLinks = () => {
  const linksDoc = allDocs.find(doc => doc._raw.flattenedPath === navLinksName),
    LinksMdx = linksDoc && getMDXComponent(linksDoc.body.code);
  return LinksMdx && <LinksMdx components={{ ...mdxComponents, NavLink }} />;
};
