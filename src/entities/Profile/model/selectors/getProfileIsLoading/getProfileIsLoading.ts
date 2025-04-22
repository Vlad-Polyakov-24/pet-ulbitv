import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getProfileIsLoading = (state: StoreProviderSchema) => state.profile?.isLoading;