import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getProfileData = (state: StoreProviderSchema) => state.profile?.data;