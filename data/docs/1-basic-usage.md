---
title: Basic usage
category: usage
---

Pages in this docs site are located in the `data/` directory, and can be either `.md` or `.mdx` files. `.md` files are plain Markdown files, while `.mdx` files allow you to use MDX syntax, including JSX and React components.

## Page properties

Each page has some frontmatter metadata at the top, which includes information about the page. The following properties can be included:

- `title` - The title of the page. **Docs without a title will never be shown in the sidebar or search.**
- `category` - Optional ID of the category this page belongs to. If not defined, the page is uncategorized. [More info](/docs/categories)
- `showTitle` - Whether or not to show the page's title at its top. By default it's `true`.
- `showSidebar` - Whether or not to display the sidebar when this page is viewed. By default it's `true`.
- `includeInSidebar` - Whether or not to show this page as an item in the sidebar. By default it's `true`.

### Example page metadata

```md
---
title: My Page Title
category: category1
---
```

More example pages can be found in the `data/sample/` directory of this site.

## Page order

By default, the pages are shown in the sidebar and search in alphabetical order, sorted by their URL. However, it's possible to set a different order by starting the file name of a page with a number, followed by a dash. If named this way, the number and dash starting the file name are removed from that page's URL, so it's only used for setting the order.

For example, a page named `1-bbbb.mdx` would be placed before `2-aaaa.mdx`, and their URLs would be `/bbbb` and `/aaaa`.
