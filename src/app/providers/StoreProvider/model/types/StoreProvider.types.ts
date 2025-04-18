import type { EnhancedStore } from '@reduxjs/toolkit';
import type { IUserSchema } from '@entities/User';
import type { ILoginSchema } from '@features/AuthByUsername';
import type { IReducerManager } from '../../config/reducerManager';

export interface StoreProviderSchema {
	user: IUserSchema;
	login?: ILoginSchema;
}

export type StoreProviderSchemaKey = keyof StoreProviderSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StoreProviderSchema> {
	reducerManager: IReducerManager;
}