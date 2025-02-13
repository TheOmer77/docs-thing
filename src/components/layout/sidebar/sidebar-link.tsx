import {
  type ComponentProps,
  type ComponentRef,
  type MouseEventHandler,
  Suspense,
} from 'react';
import { useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal';

const SidebarLinkContent = ({
  href,
  children,
  ...props
}: ComponentProps<'a'>) => {
  const router = useRouter();
  const { currentModal, openModal } = useModal();

  const handleClick: MouseEventHandler<ComponentRef<'a'>> = e => {
    if (!e.currentTarget) return;
    const pathname = e.currentTarget.pathname;
    e.preventDefault();

    // Same behavior as Next link
    if (!currentModal) return router.push(pathname);

    // First close drawer, then navigate
    openModal(null, 'replace');
    setTimeout(() => router.replace(pathname), 10);
  };

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export const SidebarLink = ({
  href,
  children,
  ...props
}: ComponentProps<'a'>) => (
  <Suspense
    fallback={
      <a {...props} href={href}>
        {children}
      </a>
    }
  >
    <SidebarLinkContent {...props} href={href}>
      {children}
    </SidebarLinkContent>
  </Suspense>
);
