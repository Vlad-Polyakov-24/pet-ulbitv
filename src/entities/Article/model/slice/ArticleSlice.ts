import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import type { IArticleSchema } from '../types/ArticleSchema.types';
import type { IArticle } from '../types/Article.types';

const initialState: IArticleSchema = {
	isLoading: false,
	error: undefined,
	data: undefined,
};

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticleById.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchArticleById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;