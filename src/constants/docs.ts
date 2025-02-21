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

export const filteredDocs = allDocs.filter(doc => {
  if (!doc.title || !doc.includeInSidebar) return false;
  const parentFolder = doc._meta.path.split('/').slice(0, -1).join('/');
  return !allDocs.some(
    d =>
      d._meta.path === parentFolder &&
      d._id.startsWith(`${parentFolder}/index.`)
  );
});

export const sidebarDocs = [
  ...filteredDocs
    .filter(doc => !isNaN(Number(doc._meta.fileName.split('-')[0])))
    .sort((a, b) => {
      const aFilenameNum = Number(a._meta.fileName.split('-')[0]),
        bFilenameNum = Number(b._meta.fileName.split('-')[0]);

      switch (true) {
        case aFilenameNum > bFilenameNum:
          return 1;
        case aFilenameNum < bFilenameNum:
          return -1;
        case a.url > b.url:
          return 1;
        case a.url < b.url:
          return -1;
        default:
          return 0;
      }
    }),
  ...filteredDocs
    .filter(doc => isNaN(Number(doc._meta.fileName.split('-')[0])))
    .sort((a, b) => (a.url > b.url ? 1 : a.url < b.url ? -1 : 0)),
];

