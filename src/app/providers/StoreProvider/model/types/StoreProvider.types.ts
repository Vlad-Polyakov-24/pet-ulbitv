import { createReduxStore } from '../../config/store';
import type { EnhancedStore } from '@reduxjs/toolkit';
import type { IUserSchema } from '@entities/User';
import type { ILoginSchema } from '@features/AuthByUsername';
import type { IProfileSchema } from '@entities/Profile';
import type { IReducerManager } from '../../config/reducerManager';

export interface StoreProviderSchema {
	user: IUserSchema;
	login?: ILoginSchema;
	profile?: IProfileSchema;
}

export type StoreProviderSchemaKey = keyof StoreProviderSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StoreProviderSchema> {
	reducerManager: IReducerManager;
}

export type AppStore = ReturnType<typeof createReduxStore>;

export type AppDispatch = AppStore['dispatch'];