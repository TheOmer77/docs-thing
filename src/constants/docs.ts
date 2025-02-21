import {
  allConfigs,
  allDocs as unsortedAllDocs,
  type Doc,
} from 'content-collections';

// Workaround: Content Collections doesn't support singletons
if (!allConfigs[0]) throw new Error('Site config (config.json) is missing!');
export const config = allConfigs[0];

const getParentDoc = (doc: Doc) => {
  if (!doc.title || !doc.includeInSidebar) return;
  const parentFolder = doc._meta.path.split('/').slice(0, -1).join('/');
  return unsortedAllDocs.find(
    d =>
      d._meta.path === parentFolder &&
      d._id.startsWith(`${parentFolder}/index.`)
  );
};

export const allDocs = unsortedAllDocs.sort((a, b) => {
  const [aCategoryIdx, bCategoryIdx] = [a, b].map(doc =>
    Object.keys(config.categories).findIndex(key =>
      [doc.category, getParentDoc(doc)?.category].includes(key)
    )
  ) as [number, number];
  const [aFilenameNum, bFilenameNum] = [a, b].map(({ _meta }) =>
    Number(_meta.fileName.split('-')[0])
  );

  if (aCategoryIdx !== bCategoryIdx)
    return aCategoryIdx > bCategoryIdx ? 1 : -1;
  if (aFilenameNum && bFilenameNum && aFilenameNum !== bFilenameNum)
    return aFilenameNum > bFilenameNum ? 1 : -1;
  if (a.url !== b.url) return a.url > b.url ? 1 : -1;
  return 0;
});

export const topLevelDocs = allDocs.filter(doc => !getParentDoc(doc));

const uncategorizedDocs = topLevelDocs.filter(
  doc =>
    typeof doc.category !== 'string' ||
    !Object.keys(config.categories).includes(doc.category)
);
export const docsByCategory = {
  ...(uncategorizedDocs.length > 0 ? { _: uncategorizedDocs } : {}),
  ...Object.keys(config.categories).reduce(
    (obj, category) => ({
      ...obj,
      [category]: topLevelDocs.filter(doc => doc.category === category),
    }),
    {} as { [key: string]: Doc[] }
  ),
};
