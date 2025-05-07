import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { ArticleView } from '@entities/Article';

export const getArticlesPageView = (state: StoreProviderSchema) => state.articlesPage?.view || ArticleView.GRID;
export const getArticlesPageIsLoading = (state: StoreProviderSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StoreProviderSchema) => state.articlesPage?.error;
export const getArticlesPageNum = (state: StoreProviderSchema) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StoreProviderSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageHasMore = (state: StoreProviderSchema) => state.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StoreProviderSchema) => state.articlesPage?._inited;