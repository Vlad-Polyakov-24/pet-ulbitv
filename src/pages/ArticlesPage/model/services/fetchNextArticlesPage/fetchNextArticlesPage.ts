import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
	getArticlesPageHasMore,
	getArticlesPageIsLoading,
	getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import type { ThunkConfig } from '@app/providers/StoreProvider';

export const fetchNextArticlesPage = createAsyncThunk<void, undefined, ThunkConfig<string>>(
	'articlesPage/fetchNextArticlesPage',
	async (_, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;
		const hasMore = getArticlesPageHasMore(getState());
		const page = getArticlesPageNum(getState());
		const isLoading = getArticlesPageIsLoading(getState());

		if (hasMore && !isLoading) {
			dispatch(articlesPageActions.setPage(page + 1));
			dispatch(fetchArticlesList({ page: page + 1 }));
		}
	},
);