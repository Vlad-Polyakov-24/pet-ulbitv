import type { NavigateOptions, To } from 'react-router';
import type { AxiosInstance } from 'axios';
import { createReduxStore } from '../../config/store';
import type { EnhancedStore } from '@reduxjs/toolkit';
import type { IReducerManager } from '../../config/reducerManager';
import type { IUserSchema } from '@entities/User';
import type { ILoginSchema } from '@features/AuthByUsername';
import type { IProfileSchema } from '@entities/Profile';
import type { IArticleSchema } from '@entities/Article';
import type { IArticleCommentsSchema } from '@pages/ArticlePage';
import type { IAddCommentSchema } from '@features/AddComment';

export interface StoreProviderSchema {
	user: IUserSchema;
	login?: ILoginSchema;
	profile?: IProfileSchema;
	article?: IArticleSchema;
	articleComments?: IArticleCommentsSchema;
	addComment?: IAddCommentSchema;
}

export type StoreProviderSchemaKey = keyof StoreProviderSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StoreProviderSchema> {
	reducerManager: IReducerManager;
}

export type AppStore = ReturnType<typeof createReduxStore>;

export type AppDispatch = AppStore['dispatch'];

export interface FunkExtraArg {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: FunkExtraArg;
	state: StoreProviderSchema;
}