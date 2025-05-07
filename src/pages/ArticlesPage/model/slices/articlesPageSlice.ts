import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getStorage, setStorage } from '@shared/lib/localStorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { ArticleView, type IArticle } from '@entities/Article';
import { localStorageKeys } from '@shared/const/localStorage';
import type { IArticlesPageSchema } from '../types/ArticlesPageSchema';

const articlesAdapter = createEntityAdapter({
	selectId: (article: IArticle) => article.id,
});

const emptyArticlesPageState = articlesAdapter.getInitialState();

export const getArticles = articlesAdapter.getSelectors<StoreProviderSchema>(
	(state) => state.articlesPage || emptyArticlesPageState,
);

const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	initialState: articlesAdapter.getInitialState<IArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		view: ArticleView.GRID,
		page: 1,
		hasMore: true,
		ids: [],
		entities: {},
		_inited: false,
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			const view = action.payload;
			state.view = view;
			state.limit = view === ArticleView.GRID ? 9 : 4;
			setStorage(localStorageKeys.ARTICLES_VIEW, view);
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		initState: (state) => {
			const view = getStorage(localStorageKeys.ARTICLES_VIEW) as ArticleView || ArticleView.GRID;
			state.view = view;
			state.limit = view === ArticleView.GRID ? 9 : 4;
			state._inited = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticlesList.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<IArticle[]>) => {
				state.isLoading = false;
				articlesAdapter.addMany(state, action.payload);
				state.hasMore = action.payload.length > 0;
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articlesPageReducer, actions: articlesPageActions  } = articlesPageSlice;