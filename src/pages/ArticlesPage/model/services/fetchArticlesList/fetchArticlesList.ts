import { createAsyncThunk } from '@reduxjs/toolkit';
import { addQueryParams } from '@shared/lib/url/addQueryParams';
import {
	getArticlesPageLimit,
	getArticlesPageNum,
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageTypes,
} from '../../selectors/articlesPageSelectors';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import { ArticleType, type IArticle } from '@entities/Article';

interface FetchArticlesListProps {
	replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<IArticle[], FetchArticlesListProps | undefined, ThunkConfig<string>>(
	'articlesPage/fetchArticlesList',
	async (_, thunkAPI) => {
		const { rejectWithValue, extra, getState } = thunkAPI;
		const limit = getArticlesPageLimit(getState());
		const page = getArticlesPageNum(getState());
		const sort = getArticlesPageSort(getState());
		const order = getArticlesPageOrder(getState());
		const search = getArticlesPageSearch(getState());
		const types = getArticlesPageTypes(getState());

		try {
			addQueryParams({
				sort,
				order,
				search,
				type: types.includes(ArticleType.ALL) ? [] : types,
			});

			const response = await extra.api.get<IArticle[]>(endpoints.ARTICLES, {
				params: {
 					_expand: 'user',
					_limit: limit,
					_page: page,
					_sort: sort,
					_order: order,
					q: search,
					...(types.includes(ArticleType.ALL) ? {} : { type_like: types }),
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