import { config } from 'contentlayer/generated';
import Link from 'next/link';

const Home = () => (
  <div
    className='mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-3xl flex-col
items-start justify-center gap-4 px-8'
  >
    <h1 className='text-7xl font-extrabold tracking-tight'>Hello world!</h1>
    <p className='text-lg text-neutral-700 dark:text-neutral-300'>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit,
      nesciunt soluta? Repellat reiciendis facere adipisci, amet eligendi dolore
      quasi voluptas.
    </p>
    <Link
      href={config.getStartedUrl}
      className='flex h-12 items-center justify-center rounded-lg
bg-primary-main px-6 text-lg font-medium text-primary-contrast shadow-md
shadow-neutral-950/20 transition-[background-color] duration-200 state-layer
hover:state-layer-primary-light/30 focus-visible:outline-none
active:bg-primary-light active:duration-0 [&>*]:z-10'
    >
      <span>Get started</span>
    </Link>
  </div>
);

export default Home;
