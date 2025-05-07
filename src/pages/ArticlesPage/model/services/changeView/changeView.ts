import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import { ArticleView } from '@entities/Article';

interface ChangeViewProps {
	view: ArticleView;
}

export const changeView = createAsyncThunk<void, ChangeViewProps, ThunkConfig<string>>(
	'articlesPage/changeView',
	async ({ view }, { dispatch }) => {
		dispatch(articlesPageActions.setView(view));
		dispatch(articlesPageActions.setPage(1));
		dispatch(fetchArticlesList({ page: 1 }));
	},
);