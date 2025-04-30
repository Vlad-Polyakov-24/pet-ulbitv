import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import type { IComment } from '@entities/Comment';
import type { IArticleCommentsSchema } from '../types/ArticleCommentsSchema';

const commentsAdapter = createEntityAdapter({
	selectId: (comment: IComment) => comment.id,
});

const emptyCommentsState = commentsAdapter.getInitialState();

export const getArticleComments = commentsAdapter.getSelectors<StoreProviderSchema>(
	(state) => state.articleComments || emptyCommentsState,
);

const articleCommentsSlice = createSlice({
	name: 'articleComments',
	initialState: commentsAdapter.getInitialState<IArticleCommentsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsByArticleId.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
				state.isLoading = false;
				commentsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articleCommentsSliceReducer } = articleCommentsSlice;