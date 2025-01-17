import { Fragment, Suspense, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal';
import { allDocs, config, sidebarDocs } from '@/constants/docs';
import type { Doc } from '@/types/docs';

import { SearchButton } from './search-button';
import { SearchDialog } from './search-dialog';
import { SearchGroup } from './search-group';
import { SearchItem } from './search-item';

const uncategorizedDocs = sidebarDocs.filter(
    doc =>
      typeof doc.category !== 'string' ||
      !Object.keys(config.categories).includes(doc.category)
  ),
  docsByCategory = {
    ...(uncategorizedDocs.length > 0 ? { _: uncategorizedDocs } : {}),
    ...Object.keys(config.categories).reduce(
      (obj, category) => ({
        ...obj,
        [category]: sidebarDocs.filter(doc => doc.category === category),
      }),
      {} as { [key: string]: Doc[] }
    ),
  };

const ClientSearch = () => {
  const { currentModal, openModal, closeModal } = useModal();
  const router = useRouter();

  const handleOpenChange = (open: boolean) => !open && closeModal();

  const handleDocSelect = useCallback(
    (doc: Doc) => {
      openModal(null, 'replace');
      setTimeout(() => router.replace(doc.url), 10);
    },
    [openModal, router]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key !== 'k') return;
      event.preventDefault();
      openModal('search');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openModal]);

  return (
    <>
      <SearchButton onClick={() => openModal('search')} />
      <SearchDialog
        open={currentModal === 'search'}
        onOpenChange={handleOpenChange}
      >
        {Object.keys(docsByCategory).map(category => (
          <SearchGroup
            key={category}
            {...(category !== '_'
              ? { heading: config.categories[category] }
              : {})}
          >
            {docsByCategory[category as keyof typeof docsByCategory]?.map(
              doc => {
                const children = allDocs
                  .filter(childDoc =>
                    childDoc._meta.path.startsWith(`${doc._meta.path}/`)
                  )
                  .sort((a, b) => (a._meta.path > b._meta.path ? 1 : -1));
                return (
                  <Fragment key={doc._id}>
                    <SearchItem
                      key={doc._id}
                      doc={doc}
                      onSelect={() => handleDocSelect(doc)}
                    />
                    {children.map(childDoc => (
                      <SearchItem
                        key={childDoc._id}
                        doc={childDoc}
                        parentDoc={doc}
                        onSelect={() => handleDocSelect(childDoc)}
                      />
                    ))}
                  </Fragment>
                );
              }
            )}
          </SearchGroup>
        ))}
      </SearchDialog>
    </>
  );
};

export const Search = () => (
  <Suspense fallback={<SearchButton disabled />}>
    <ClientSearch />
  </Suspense>
);
