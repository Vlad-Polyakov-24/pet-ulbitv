import type { NavigateOptions, To } from 'react-router';
import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from '../config/reducerManager';
import { userReducer } from '@entities/User';
import { ENV } from '@shared/config/env/env';
import { $api } from '@shared/api/axios';
import type { StoreProviderSchema } from '../model/types/StoreProvider.types';

type CreateReduxStoreProps = {
	initialState?: StoreProviderSchema;
	navigate?: (to: To, options?: NavigateOptions) => void;
};

export const createReduxStore = (props: CreateReduxStoreProps) => {
	const { initialState, navigate } = props;
	const rootReducer: ReducersMapObject<StoreProviderSchema> = {
		user: userReducer,
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
					navigate,
				},
			},
		}),
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
};