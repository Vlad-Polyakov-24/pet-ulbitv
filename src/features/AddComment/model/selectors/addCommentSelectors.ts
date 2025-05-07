import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getAddCommentData = (state: StoreProviderSchema) => state.addComment?.comment ?? '';
export const getAddCommentError = (state: StoreProviderSchema) => state.addComment?.error;