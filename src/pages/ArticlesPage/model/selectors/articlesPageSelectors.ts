import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { ArticleView } from '@entities/Article';

export const getArticlesPageView = (state: StoreProviderSchema) => state.articlesPage?.view || ArticleView.GRID;
export const getArticlesPageIsLoading = (state: StoreProviderSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageError = (state: StoreProviderSchema) => state.articlesPage?.error;