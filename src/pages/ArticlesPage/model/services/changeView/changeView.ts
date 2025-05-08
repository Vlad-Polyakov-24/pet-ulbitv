import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions, getArticles } from '../../slices/articlesPageSlice';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import { ArticleView } from '@entities/Article';

interface ChangeViewProps {
	view: ArticleView;
}

export const changeView = createAsyncThunk<void, ChangeViewProps, ThunkConfig<string>>(
	'articlesPage/changeView',
	async ({ view }, { dispatch, getState }) => {
		const state = getState();
		const newLimit = view === ArticleView.GRID ? 9 : 4;
		const articlesCount = getArticles.selectAll(state).length;
		const newPage = Math.ceil(articlesCount / newLimit) || 1;

		dispatch(articlesPageActions.setView(view));
		dispatch(articlesPageActions.setPage(newPage));

		dispatch(fetchArticlesList());
	},
);