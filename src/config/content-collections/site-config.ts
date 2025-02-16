import { defineCollection } from '@content-collections/core';

export const siteConfig = defineCollection({
  name: 'Config',
  directory: 'content',
  include: 'config.json',
  parser: 'json',
  schema: z => ({
    /** Site title, appearing by default as the home page's `<title>`, as well
     * as in the Nav's header. */
    title: z.string().default('Docs'),
    /** Template for the `<title>` of pages. */
    titleTemplate: z.string().default('%s – Docs'),
    /** Links that will appear in the navbar, such as your git repo or social
     * media. */
    links: z
      .array(
        z.object({ href: z.string(), label: z.string(), type: z.string() })
      )
      .default([]),
    /** Object where keys are category IDs and values are display names. */
    categories: z.record(z.string(), z.string()).default({}),
  }),
});
