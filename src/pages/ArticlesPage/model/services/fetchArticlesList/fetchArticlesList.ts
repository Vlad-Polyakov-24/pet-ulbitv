import { createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { IArticle } from '@entities/Article';

export const fetchArticlesList = createAsyncThunk<IArticle[], undefined, ThunkConfig<string>>(
	'articlesPage/fetchArticlesList',
	async (_, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI;

		try {
			const response = await extra.api.get<IArticle[]>(endpoints.ARTICLES, {
				params: {
 					_expand: 'user',
				},
			});

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.error(e);
			return rejectWithValue('fetch articles list failed');
		}
	},
);