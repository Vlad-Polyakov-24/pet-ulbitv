import { createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { IComment } from '@entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<IComment[], string | undefined, ThunkConfig<string>>(
	'articlePage/fetchCommentsByArticleId',
	async (articleId, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI;

		if (!articleId) {
			return rejectWithValue('fetch article comments failed');
		}

		try {
			const response = await extra.api.get<IComment[]>(endpoints.COMMENTS, {
				params: {
					articleId,
					_expand: 'user',
				},
			});

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.error(e);
			return rejectWithValue('fetch article comments failed');
		}
	},
);