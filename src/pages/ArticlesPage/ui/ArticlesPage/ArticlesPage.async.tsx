import { lazy } from 'react';

const ArticlesPageAsync = lazy(async () => import('./ArticlesPage'));

export { ArticlesPageAsync as ArticlesPage };