import { createAsyncThunk } from '@reduxjs/toolkit';
import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { IArticle } from '@entities/Article';

interface FetchArticlesListProps {
	page?: number;
}

export const fetchArticlesList = createAsyncThunk<IArticle[], FetchArticlesListProps, ThunkConfig<string>>(
	'articlesPage/fetchArticlesList',
	async (props, thunkAPI) => {
		const { rejectWithValue, extra, getState } = thunkAPI;
		const { page = 1 } = props;
		const limit = getArticlesPageLimit(getState());

		try {
			const response = await extra.api.get<IArticle[]>(endpoints.ARTICLES, {
				params: {
 					_expand: 'user',
					_limit: limit,
					_page: page,
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