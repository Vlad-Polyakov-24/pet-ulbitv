import type { StoreProviderSchema } from '@app/providers/StoreProvider';

export const getProfileValidateErrors = (state: StoreProviderSchema) => state.profile?.validateErrors;