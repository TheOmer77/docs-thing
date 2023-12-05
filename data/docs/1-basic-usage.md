---
title: Basic usage
category: usage
---

Pages in this docs site are located in the `data/` directory, and can be either `.md` or `.mdx` files. `.md` files are plain Markdown files, while `.mdx` files allow you to use MDX syntax, including JSX and React components.

Each page has some frontmatter metadata at the top, which includes information about the page. The following properties can be included:

- `title` - The title of the page. **Docs without a title will never be shown in the sidebar or search.**
- `category` - Optional ID of the category this page belongs to. If not defined, the page is uncategorized. [More info](/docs/categories)
- `showTitle` - Whether or not to show the page's title at its top. By default it's `true`.
- `showInSidebar` - Whether or not to show this page as an item in the sidebar. By default it's `true`.
- `displaySidebar` - Whether or not to display the sidebar when this page is viewed. By default it's `true`.

## Example page metadata

```yaml
---
title: My Page Title
category: category1
---
```

More example pages can be found in the `data/sample/` directory of this site.
