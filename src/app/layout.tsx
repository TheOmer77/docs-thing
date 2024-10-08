import type { ReactNode } from 'react';
import { Figtree, Fira_Code } from 'next/font/google';
import clsx from 'clsx';

import Layout from '@/components/layout';
import { config } from '@/constants/contentlayer';

import '@/styles/index.css';
import '@/styles/prism.css';

const font = Figtree({
  subsets: ['latin'],
  variable: '--font-family',
  fallback: ['sans-serif'],
});
const fontMono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-family-mono',
  fallback: ['monospace'],
});

export const metadata = {
  title: { template: config.titleTemplate, default: config.title },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html className={clsx(font.variable, fontMono.variable)}>
    <head>
      <link rel='icon' type='image/x-icon' href='/favicon.png' />
    </head>
    <body>
      <div className='mx-auto flex max-w-8xl flex-row overflow-x-hidden'>
        <Layout>{children}</Layout>
      </div>
    </body>
  </html>
);

export default RootLayout;
