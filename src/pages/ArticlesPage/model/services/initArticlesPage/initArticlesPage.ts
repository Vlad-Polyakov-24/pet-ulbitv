import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited, } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import type { ThunkConfig } from '@app/providers/StoreProvider';

export const initArticlesPage = createAsyncThunk<void, undefined, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (_, thunkAPI) => {
		const { getState, dispatch } = thunkAPI;
		const inited = getArticlesPageInited(getState());

		if (!inited) {
			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({ page: 1 }));
		}
	},
);