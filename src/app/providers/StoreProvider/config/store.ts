import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from '../config/reducerManager';
import { userReducer } from '@entities/User';
import { scrollRestorationReducer } from '@features/ScrollRestoration';
import { ENV } from '@shared/config/env/env';
import { $api } from '@shared/api/axios';
import type { StoreProviderSchema } from '../model/types/StoreProvider.types';

type CreateReduxStoreProps = {
	initialState?: StoreProviderSchema;
};

export const createReduxStore = ({ initialState }: CreateReduxStoreProps) => {
	const rootReducer: ReducersMapObject<StoreProviderSchema> = {
		user: userReducer,
		scrollRestoration: scrollRestorationReducer,
	};

	const reducerManager = createReducerManager(rootReducer);

	const store = configureStore({
		reducer: reducerManager.reduce,
		devTools: ENV.IS_DEV,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: {
					api: $api,
				},
			},
		}),
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
};