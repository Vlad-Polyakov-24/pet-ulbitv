import type { EntityState } from '@reduxjs/toolkit';
import { ArticleView, type IArticle } from '@entities/Article';

export interface IArticlesPageSchema extends EntityState<IArticle, string>{
	isLoading?: boolean;
	error?: string;
	view: ArticleView;
	page: number;
	limit?: number;
	hasMore: boolean;
	_inited: boolean;
}