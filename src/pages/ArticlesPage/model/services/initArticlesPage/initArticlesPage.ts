import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited, } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import { SortOrder } from '@shared/types/globals.types';
import { ArticleSortField } from 'src/widgets/ArticlesFilters';
import { ArticleType } from '@entities/Article';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (searchParams, { getState, dispatch }) => {
		if (getArticlesPageInited(getState())) return;

		const queryParams = {
			order: searchParams.get('order') as SortOrder,
			sort: searchParams.get('sort') as ArticleSortField,
			search: searchParams.get('search'),
			type: searchParams.getAll('type') as ArticleType[],
		};

		const types = queryParams.type.length > 0 ? queryParams.type : [ArticleType.ALL];

		if (queryParams.order) {
			dispatch(articlesPageActions.setOrder(queryParams.order));
		}
		if (queryParams.sort) {
			dispatch(articlesPageActions.setSort(queryParams.sort));
		}
		if (queryParams.search) {
			dispatch(articlesPageActions.setSearch(queryParams.search));
		}
		if (types) {
			dispatch(articlesPageActions.setType(types));
		}

		dispatch(articlesPageActions.initState());
		dispatch(fetchArticlesList());
	},
);