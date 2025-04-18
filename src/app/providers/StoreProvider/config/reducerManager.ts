import { combineReducers, type Action, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import type { StoreProviderSchema, StoreProviderSchemaKey } from '../model/types/StoreProvider.types';

export const createReducerManager = (initialReducers: ReducersMapObject<StoreProviderSchema>) => {
	const reducers = { ...initialReducers };

	let combinedReducer = combineReducers(reducers as ReducersMapObject<Required<StoreProviderSchema>>);

	let keysToRemove: StoreProviderSchemaKey[] = [];

	return {
		getReducerMap: () => reducers,
		reduce: (state: StoreProviderSchema | undefined, action: Action) => {
			if (keysToRemove.length > 0 && state) {
				state = { ...state };
				keysToRemove.forEach((key) => delete state?.[key]);
				keysToRemove = [];
			}

			return combinedReducer(state as Partial<StoreProviderSchema>, action);
		},
		add: (key: StoreProviderSchemaKey, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return
			}

			reducers[key] = reducer;

			combinedReducer = combineReducers(reducers as ReducersMapObject<Required<StoreProviderSchema>>);
		},
		remove: (key: StoreProviderSchemaKey) => {
			if (!key || !reducers[key]) {
				return
			}

			delete reducers[key];

			keysToRemove.push(key);

			combinedReducer = combineReducers(reducers as ReducersMapObject<Required<StoreProviderSchema>>);
		},
	}
};

export type IReducerManager = ReturnType<typeof createReducerManager>;