import { lazy } from 'react';

const ArticleEditPageAsync = lazy(async () => import('./ArticleEditPage'));

export { ArticleEditPageAsync as ArticleEditPage };