import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import type { StoreProviderSchema } from '../model/types/StoreProvider.types';

type StoreProviderProps = {
	children?: ReactNode;
	initialState?: StoreProviderSchema;
};

const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
	const store = createReduxStore(initialState);

	return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;