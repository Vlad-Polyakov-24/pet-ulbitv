import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from '../config/reducerManager';
import { userReducer } from '@entities/User';
import { ENV } from '@shared/config/env/env';
import type { StoreProviderSchema } from '../model/types/StoreProvider.types';

export const createReduxStore = (initialState?: StoreProviderSchema) => {
	const rootReducer: ReducersMapObject<StoreProviderSchema> = {
		user: userReducer,
	};

	const reducerManager = createReducerManager(rootReducer);

	const store = configureStore<StoreProviderSchema>({
		reducer: reducerManager.reduce,
		devTools: ENV.IS_DEV,
		preloadedState: initialState,
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
};