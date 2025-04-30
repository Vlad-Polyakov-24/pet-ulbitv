import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StoreProviderSchema) => state.articleComments?.isLoading;
export const getArticleCommentsError = (state: StoreProviderSchema) => state.articleComments?.error;