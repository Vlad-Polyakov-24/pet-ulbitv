import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getLoginState = (state: StoreProviderSchema) => state.login;