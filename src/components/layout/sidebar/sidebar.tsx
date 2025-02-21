import { Fragment, Suspense } from 'react';
import { usePathname } from 'next/navigation';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { List, ListSubheader } from '@/components/ui/list';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDoc } from '@/hooks/use-doc';
import { useModal } from '@/hooks/use-modal';
import { allDocs, config, docsByCategory } from '@/constants/docs';

import { SidebarItem } from './sidebar-item';
import { Logo } from '../logo';

const ListCategories = () => {
  const pathname = usePathname();

  return Object.entries(docsByCategory).map(([category, docs]) => (
    <Fragment key={category}>
      {category !== '_' && (
        <ListSubheader className='bg-popover' data-sidebar-subheader=''>
          {config.categories[category] || category}
        </ListSubheader>
      )}
      {docs.map(doc => {
        const childDocs = allDocs
          .filter(childDoc =>
            childDoc._meta.path.startsWith(`${doc._meta.path}/`)
          )
          .sort((a, b) => (a._meta.path > b._meta.path ? 1 : -1));
        const isActive = doc.url === pathname,
          isChildActive = childDocs.some(childDoc => childDoc.url === pathname);

        return (
          <Collapsible open={isActive || isChildActive} key={doc._id}>
            <CollapsibleTrigger asChild>
              <SidebarItem
                doc={doc}
                active={isActive}
                childActive={isChildActive}
              />
            </CollapsibleTrigger>
            {childDocs.length > 0 && (
              <CollapsibleContent className='flex w-full flex-col gap-px ps-4'>
                {childDocs.map(childDoc => (
                  <SidebarItem
                    key={childDoc._id}
                    doc={childDoc}
                    active={childDoc.url === pathname}
                  />
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        );
      })}
    </Fragment>
  ));
};

const SidebarDrawer = () => {
  const { currentModal, closeModal } = useModal();
  const handleOpenChange = (open: boolean) => !open && closeModal();

  return (
    <Drawer
      open={currentModal === 'nav-drawer'}
      onOpenChange={handleOpenChange}
      direction='left'
    >
      <DrawerContent aria-describedby={undefined}>
        <DrawerTitle className='sr-only'>Navigation drawer</DrawerTitle>
        <Logo />
        <ScrollArea className='flex max-h-[calc(100dvh-4rem)] flex-col gap-px overflow-y-auto rounded-lg'>
          <List className='px-2 pb-2'>
            <ListCategories />
          </List>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export const Sidebar = () => {
  const doc = useDoc();

  return (
    <>
      {doc?.showSidebar && (
        <aside className='fixed top-0 z-10 hidden w-[--sidebar-width] select-none flex-col self-start after:absolute after:end-0 after:top-0 after:-z-10 after:h-screen after:w-screen after:bg-card md:flex print:hidden [&_[data-sidebar-subheader]]:bg-card'>
          <ScrollArea className='mt-16 flex max-h-[calc(100dvh-4rem)] flex-col gap-px overflow-y-auto rounded-lg'>
            <List className='px-2 pb-2'>
              <ListCategories />
            </List>
          </ScrollArea>
        </aside>
      )}
      <Suspense>
        <SidebarDrawer />
      </Suspense>
    </>
  );
};
