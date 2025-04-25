import { createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { IArticle } from '../../types/Article.types';

export const fetchArticleById = createAsyncThunk<IArticle, string, ThunkConfig<string>>(
	'article/fetchArticleById',
	async (articleId, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI;

		try {
			const response = await extra.api.get<IArticle>(`${endpoints.ARTICLES}/${articleId}`);

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.error(e);
			return rejectWithValue('fetch article failed');
		}
	},
);