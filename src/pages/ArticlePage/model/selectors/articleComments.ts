import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StoreProviderSchema) => state.articlePage?.comments?.isLoading;
export const getArticleCommentsError = (state: StoreProviderSchema) => state.articlePage?.comments?.error;