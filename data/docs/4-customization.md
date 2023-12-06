---
title: Customization
category: usage
---

## Site configuration

The `config.json` file in the `data/` directory defines various site-wide properties. In addition to [categories](/docs/categories), the following properties can be defined:

- `title` - Site title, appearing by default as the home page's `<title>`, as well as in the Nav's header.
- `titleTemplate` - Template for the `<title>` of pages other than the home page.

## Special pages

The following files are special pages which will be displayed in specific situations:

- `index.mdx` - Home page of this docs site. It will be displayed when navigating to the root of the site (`/`).
- `_not-found.mdx` - The "404 not found" error page of the site, which will be displayed when attempting to navigate to a URL of a page that doesn't exist. If not present, a default error page will be used.

## Page layouts

The pages described above use special layout components by default, however these layouts can also be used in any other page.

### HomeLayout

| Prop                                                        | Type                         |
| ----------------------------------------------------------- | ---------------------------- |
| `title` <br/> Home page main title.                         | `ReactNode`                  |
| `tagline` <br/> Short text that appears below the title.    | `ReactNode`                  |
| `actions` <br/> Action buttons appearing below the tagline. | Array of actions - see below |

#### Action object

| Prop                                                                                             | Type        |
| ------------------------------------------------------------------------------------------------ | ----------- |
| `text` <br/> Text for this action button.                                                        | `ReactNode` |
| `url` <br/> URL opened by clicking on this action button.                                        | `string`    |
| `primary` <br/> Whether or not this is the primary action, which uses the theme's primary color. | `boolean`   |

### ErrorLayout

| Prop                                           | Type        |
| ---------------------------------------------- | ----------- |
| `code` <br/> The error code, or main title.    | `ReactNode` |
| `text` <br/> A short description of the error. | `ReactNode` |

## Navbar customization

The navbar can be customized by editing the following files:

- `_nav-logo.mdx` - The logo of this docs site, displayed in the desktop navbar as well as at the top of the mobile sidebar.
  If not present, a simple text with the site's title will be used as the logo.
- `_nav-links.mdx` - Optional links that will appear after the search button in the navbar, such as links to your git repo, social media, etc.
  Within it you can use the `<NavLink>` component, an icon button which works as a link (`<a>`).
