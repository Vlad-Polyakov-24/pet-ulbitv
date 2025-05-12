import type { AxiosInstance } from 'axios';
import { createReduxStore } from '../../config/store';
import type { EnhancedStore } from '@reduxjs/toolkit';
import type { IReducerManager } from '../../config/reducerManager';
import type { IUserSchema } from '@entities/User';
import type { IScrollRestorationSchema } from '@features/ScrollRestoration';
import type { ILoginSchema } from '@features/AuthByUsername';
import type { IProfileSchema } from '@entities/Profile';
import type { IArticleSchema } from '@entities/Article';
import type { IArticlePageSchema } from '@pages/ArticlePage';
import type { IAddCommentSchema } from '@features/AddComment';
import type { IArticlesPageSchema } from '@pages/ArticlesPage';

export interface StoreProviderSchema {
	user: IUserSchema;
	scrollRestoration: IScrollRestorationSchema;
	login?: ILoginSchema;
	profile?: IProfileSchema;
	article?: IArticleSchema;
	articlePage?: IArticlePageSchema;
	addComment?: IAddCommentSchema;
	articlesPage?: IArticlesPageSchema;
}

export type StoreProviderSchemaKey = keyof StoreProviderSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StoreProviderSchema> {
	reducerManager: IReducerManager;
}

export type AppStore = ReturnType<typeof createReduxStore>;

export type AppDispatch = AppStore['dispatch'];

export interface FunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: FunkExtraArg;
	state: StoreProviderSchema;
}