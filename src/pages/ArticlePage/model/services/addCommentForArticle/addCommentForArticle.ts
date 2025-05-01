import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthData } from '@entities/User';
import { getArticleData } from '@entities/Article';
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { IComment } from '@entities/Comment';

export const addCommentForArticle = createAsyncThunk<IComment, string, ThunkConfig<string>>(
	'articlePage/addCommentForArticle',
	async (comment, thunkAPI) => {
		const { rejectWithValue, extra, getState, dispatch } = thunkAPI;
		const userData = getAuthData(getState());
		const article = getArticleData(getState());

		if (!userData || !comment || !article) {
			return rejectWithValue('no data');
		}

		try {
			const response = await extra.api.post<IComment>(endpoints.COMMENTS, {
				articleId: article.id,
				userId: userData.id,
				text: comment,
			});

			if (!response.data) {
				throw new Error();
			}

			dispatch(fetchCommentsByArticleId(article.id));

			return response.data;
		} catch (e) {
			console.error(e);
			return rejectWithValue('send comment error');
		}
	},
);