import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getUserIsMounted = (state: StoreProviderSchema) => state.user.isMounted;