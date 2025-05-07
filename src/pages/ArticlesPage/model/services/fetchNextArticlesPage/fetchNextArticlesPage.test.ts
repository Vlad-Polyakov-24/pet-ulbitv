import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import * as articlesPageSelectors from '../../selectors/articlesPageSelectors';
import { TestAsyncThunk } from '@shared/lib/tests/TestAsyncThunk';
import { ArticleView } from '@entities/Article';

vi.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('success', async () => {
		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: true,
				_inited: false,
				view: ArticleView.GRID,
			},
		});
		await thunk.callThunk();

		expect(thunk.dispatch).toBeCalledTimes(4);
		expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
	});

	test('fetchArticlesList not called', async () => {
		vi.spyOn(articlesPageSelectors, 'getArticlesPageHasMore').mockReturnValue(false);
		vi.spyOn(articlesPageSelectors, 'getArticlesPageIsLoading').mockReturnValue(false);

		const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
			articlesPage: {
				page: 2,
				ids: [],
				entities: {},
				limit: 5,
				isLoading: false,
				hasMore: false,
				_inited: false,
				view: ArticleView.GRID,
			},
		});
		await thunk.callThunk();

		expect(thunk.dispatch).toBeCalledTimes(2);
		expect(fetchArticlesList).not.toHaveBeenCalled();
	});
});