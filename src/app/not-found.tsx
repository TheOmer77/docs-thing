import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

export const generateMetadata = () => ({
  title: 'Not found',
});

const NotFoundPage = () => (
  <main className='-mt-16 flex min-h-dvh w-full flex-col items-center justify-center px-4 py-16 text-center'>
    <h1 className='font-mono text-[min(calc(50dvw-1rem),25rem)] leading-none font-extrabold tracking-tighter text-muted-foreground/30'>
      404
    </h1>
    <p className='mb-8 leading-tight text-balance text-muted-foreground'>
      I&apos;m not sure what you were looking for... but it&apos;s not here.
    </p>
    <Link
      href='/'
      className='group flex flex-row items-center text-sm font-medium hover:underline'
    >
      <ArrowLeftIcon className='me-2 size-4 transition-transform group-hover:-translate-x-1' />
      Return home
    </Link>
  </main>
);

export default NotFoundPage;
