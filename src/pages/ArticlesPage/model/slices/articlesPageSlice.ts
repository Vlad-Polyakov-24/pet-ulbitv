import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getStorage, setStorage } from '@shared/lib/localStorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { ArticleType, ArticleView, type IArticle } from '@entities/Article';
import { localStorageKeys } from '@shared/const/localStorage';
import type { SortOrder } from '@shared/types/globals.types';
import { ArticleSortField } from '@widgets/ArticlesFilters';
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
		sort: ArticleSortField.CREATED,
		order: 'asc',
		search: '',
		limit: 9,
		types: [ArticleType.ALL],
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
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.order = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSort: (state, action: PayloadAction<ArticleSortField>) => {
			state.sort = action.payload;
		},
		setType: (state, action: PayloadAction<ArticleType[]>) => {
			state.types = action.payload;
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
			.addCase(fetchArticlesList.pending, (state, action) => {
				state.error = undefined;
				state.isLoading = true;

				if (action.meta.arg?.replace) {
					articlesAdapter.removeAll(state);
				}
			})
			.addCase(fetchArticlesList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasMore = action.payload.length >= state.limit;

				if (action.meta.arg?.replace) {
					articlesAdapter.setAll(state, action.payload);
				} else {
					articlesAdapter.addMany(state, action.payload);
				}
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articlesPageReducer, actions: articlesPageActions  } = articlesPageSlice;