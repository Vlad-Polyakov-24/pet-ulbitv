import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getProfileForm = (state: StoreProviderSchema) => state.profile?.form;