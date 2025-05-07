import { useEffect, type ReactNode } from 'react';
import { useStore } from 'react-redux';
import type { Reducer } from '@reduxjs/toolkit';
import { useAppDispatch, type ReduxStoreWithManager, type StoreProviderSchemaKey } from '@app/providers/StoreProvider';

export type ReducersList = {
	[name in StoreProviderSchemaKey]?: Reducer;
};

type ReducersListEntry = [StoreProviderSchemaKey, Reducer];

type DynamicModuleLoaderProps = {
	children: ReactNode;
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
};

const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
	const { children, reducers, removeAfterUnmount = true } = props;
	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useAppDispatch();

	useEffect(() => {
		const mountedReducers = store.reducerManager.getReducerMap();

		(Object.entries(reducers) as ReducersListEntry[]).forEach(([name, reducer]) => {
			const mounted = mountedReducers[name];

			if (!mounted) {
				store.reducerManager.add(name, reducer);
				dispatch({ type: `@INIT ${name} reducer` });
			}
		});

		return () => {
			if (removeAfterUnmount) {
				(Object.entries(reducers) as ReducersListEntry[]).forEach(([name]: ReducersListEntry) => {
					store.reducerManager.remove(name);
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
	}, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

	return <>{children}</>;
};

export { DynamicModuleLoader };