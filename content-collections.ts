import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

const doc = defineCollection({
  name: 'Doc',
  directory: 'data',
  include: '**/*.md?(x)',
  schema: z => ({
    /** Title of this page. */
    title: z.optional(z.string()),
    /** ID of the category this page belongs to. */
    category: z.optional(z.string()),
    /** Whether or not to show the page's title at its top. */
    showTitle: z.boolean().default(true),
    /** Whether or not to include this page as an item in the sidebar. */
    showInSidebar: z.boolean().default(true), // TODO: Rename to `includeInSidebar`
    /** Whether or not to show the sidebar when this page is viewed. */
    showSidebar: z.boolean().default(true),
  }),
  transform: async (doc, ctx) => {
    const filenameParts = doc._meta.fileName
      .split('.')
      .slice(0, -1)
      .join('.')
      .split('-');
    const url = `/${
      isNaN(Number(filenameParts[0]))
        ? doc._meta.path
        : [
            ...doc._meta.path.split('/').slice(0, -1),
            filenameParts.slice(1).join('-'),
          ].join('/')
    }`;

    const code = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
    });

    return {
      ...doc,
      _id: doc._meta.filePath,
      _raw: {
        sourceFilePath: doc._meta.filePath,
        sourceFileName: doc._meta.fileName,
        sourceFileDir: doc._meta.directory,
        flattenedPath: doc._meta.path,
        contentType: 'mdx',
      },
      url,
      body: { code },
    };
  },
});

const siteConfig = defineCollection({
  name: 'Config',
  directory: 'data',
  include: 'config.json',
  parser: 'json',
  schema: z => ({
    /** Site title, appearing by default as the home page's `<title>`, as well
     * as in the Nav's header. */
    title: z.string().default('Docs'),
    /** Template for the `<title>` of pages. */
    titleTemplate: z.string().default('%s – Docs'),
    /* Object where keys are category IDs and values are display names. */
    categories: z.record(z.string(), z.string()).default({}),
  }),
});

export default defineConfig({
  collections: [doc, siteConfig],
});
