import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getArticleData = (state: StoreProviderSchema) => state.article?.data;
export const getArticleIsLoading = (state: StoreProviderSchema) => state.article?.isLoading;
export const getArticleError = (state: StoreProviderSchema) => state.article?.error;