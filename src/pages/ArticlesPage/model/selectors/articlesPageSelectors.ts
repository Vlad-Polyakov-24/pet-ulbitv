import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { ArticleType, ArticleView } from '@entities/Article';
import { ArticleSortField } from '@widgets/ArticlesFilters';

export const getArticlesPageView = (state: StoreProviderSchema) => state.articlesPage?.view || ArticleView.GRID;
export const getArticlesPageIsLoading = (state: StoreProviderSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StoreProviderSchema) => state.articlesPage?.error;
export const getArticlesPageNum = (state: StoreProviderSchema) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StoreProviderSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageHasMore = (state: StoreProviderSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StoreProviderSchema) => state.articlesPage?._inited;
export const getArticlesPageOrder = (state: StoreProviderSchema) => state.articlesPage?.order ?? 'asc';
export const getArticlesPageSort = (state: StoreProviderSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesPageSearch = (state: StoreProviderSchema) => state.articlesPage?.search ?? '';
export const getArticlesPageType = (state: StoreProviderSchema) => state.articlesPage?.type ?? ArticleType.ALL;