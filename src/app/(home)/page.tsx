import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const generateMetadata = () => ({
  description: 'A simple docs site powered by Next.js and Content Collections.',
});

const actions = [
  { text: 'Get started', href: '/docs/getting-started', primary: true },
  { text: 'Sample pages', href: '/sample/markdown-test' },
] satisfies { text: string; href: string; primary?: boolean }[];

const HomePage = () => (
  <main className='isolate -mt-16 flex min-h-dvh w-full flex-col items-center justify-center gap-4 px-6 before:absolute before:start-1/2 before:top-0 before:-z-10 before:h-dvh before:w-dvw before:-translate-x-1/2 before:bg-[linear-gradient(-45deg,var(--tw-gradient-stops))] before:from-primary/25 before:to-primary/5 before:bg-cover sm:px-8 lg:px-8 before:dark:from-primary/0 before:dark:to-primary/20'>
    <div className='mx-auto max-w-2xl space-y-8 py-32 text-center sm:py-48 lg:py-56'>
      <h1 className='text-balance text-6xl font-extrabold tracking-tight sm:text-7xl'>
        Kickstart your docs.
      </h1>
      <p className='text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8'>
        Use this simple but easily extensible template, powered by Next.js and
        Content Collections, as the base for your next documentation site.
      </p>

      <div className='flex items-center justify-center gap-x-4'>
        {actions.map(({ text, href, primary }, index) => (
          <Button
            key={`home-action-${index}`}
            variant={primary ? 'primary' : 'default'}
            size='lg'
            className='cursor-pointer no-underline'
            asChild
          >
            <Link href={href}>{text}</Link>
          </Button>
        ))}
      </div>
    </div>
  </main>
);

export default HomePage;
