import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getProfileError = (state: StoreProviderSchema) => state.profile?.error;