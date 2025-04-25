import { lazy } from 'react';

const ArticlePageAsync = lazy(async () => import('./ArticlePage'));

export { ArticlePageAsync as ArticlePage };