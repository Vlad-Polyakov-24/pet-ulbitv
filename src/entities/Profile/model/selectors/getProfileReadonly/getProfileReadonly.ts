import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getProfileReadonly = (state: StoreProviderSchema) => state.profile?.readonly;