import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getAuthData = (state: StoreProviderSchema) => state.user.authData;