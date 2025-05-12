import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StoreProviderSchema) => state.articlePage?.recommendations?.isLoading;
export const getArticleRecommendationsError = (state: StoreProviderSchema) => state.articlePage?.recommendations?.error;