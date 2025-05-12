import type { EntityState } from '@reduxjs/toolkit';
import type { IArticle } from '@entities/Article';

export interface IArticleRecommendationsSchema extends EntityState<IArticle, string>{
	isLoading?: boolean;
	error?: string;
}