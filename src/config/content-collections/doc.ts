import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import GithubSlugger from 'github-slugger';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { rehypeShiki } from './shiki';

const HEADINGS_REGEX = /^(?<flag>#{1,6})\s+(?<content>.+)$/gm,
  CODEBLOCK_REGEX =
    /^(?<fence>`{3,})(?!`)[^\n]*\n[\s\S]*?\n^(?:\k<fence>)[ \t]*$/gm;

export const doc = defineCollection({
  name: 'Doc',
  directory: 'content',
  include: '**/*.mdx',
  schema: z => ({
    /** Title of this page. */
    title: z.optional(z.string()),
    /** Short description of this page, will appear below the title. */
    description: z.optional(z.string()),
    /** ID of the category this page belongs to. */
    category: z.optional(z.string()),
    /** Whether or not to show the page's title and description at its top. */
    showTitle: z.boolean().default(true),
    /** Whether or not to show the page's table of contents on the side. */
    showToc: z.boolean().default(true),
    /** Whether or not to show the next and previous page buttons at the bottom
     * of the page. */
    showPagination: z.boolean().default(true),
    /** Whether or not to show the sidebar when this page is viewed. */
    showSidebar: z.boolean().default(true),
    /** Whether or not to include this page as an item in the sidebar and search. */
    includeInSidebar: z.boolean().default(true),
  }),
  transform: async (doc, ctx) => {
    const slugs = doc._meta.path.split('/');
    const url = `/${slugs
      .map(slug => {
        const parts = slug.split('-');
        return (isNaN(Number(parts[0])) ? parts : parts.slice(1)).join('-');
      })
      .join('/')}`;

    // Don't match headings inside codeblocks
    const contentWithoutCodeblocks = doc.content.replace(CODEBLOCK_REGEX, '');

    const headingSlugger = new GithubSlugger();
    const headings = Array.from(
      contentWithoutCodeblocks.matchAll(HEADINGS_REGEX)
    ).map(({ groups }) => {
      const text = groups?.content;
      return {
        level: groups?.flag?.length,
        text,
        slug: text ? headingSlugger.slug(text) : null,
      };
    });

    const code = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeShiki, rehypeSlug],
    });

    return { ...doc, _id: doc._meta.filePath, url, headings, body: { code } };
  },
});
