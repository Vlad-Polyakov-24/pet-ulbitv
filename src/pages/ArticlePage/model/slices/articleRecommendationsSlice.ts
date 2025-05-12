import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchRecommendations } from '../services/fetchRecommendations/fetchRecommendations';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import type { IArticle } from '@entities/Article';
import type { IArticleRecommendationsSchema } from '../types/ArticleRecommendationsSchema.types';

const recommendationsAdapter = createEntityAdapter({
	selectId: (article: IArticle) => article.id,
});

const emptyRecommendationsState = recommendationsAdapter.getInitialState();

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StoreProviderSchema>(
	(state) => state.articlePage?.recommendations || emptyRecommendationsState,
);

const articleRecommendationsSlice = createSlice({
	name: 'articleRecommendations',
	initialState: recommendationsAdapter.getInitialState<IArticleRecommendationsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecommendations.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchRecommendations.fulfilled, (state, action) => {
				state.isLoading = false;
				recommendationsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchRecommendations.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articleRecommendationsSliceReducer } = articleRecommendationsSlice;