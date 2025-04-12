import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '@entities/User';
import { ENV } from '@shared/config/env/env';
import type { StoreProviderSchema } from '../model/types/StoreProvider.types';

export const createReduxStore = (initialState?: StoreProviderSchema) => {
	const rootReducer: ReducersMapObject<StoreProviderSchema> = {
		user: userReducer,
	};

	return configureStore<StoreProviderSchema>({
		reducer: rootReducer,
		devTools: ENV.IS_DEV,
		preloadedState: initialState,
	})
};