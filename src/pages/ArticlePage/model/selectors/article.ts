import { createSelector } from '@reduxjs/toolkit';
import { getArticleData } from '@entities/Article';
import { getAuthData } from '@entities/User';

export const getCanEditArticle = createSelector(
	getArticleData,
	getAuthData,
	(article, user) => {
		if (!article || !user) return false;
		return article.user.id === user.id;
	},
);