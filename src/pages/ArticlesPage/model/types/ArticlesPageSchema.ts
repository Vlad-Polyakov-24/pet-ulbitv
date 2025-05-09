import type { EntityState } from '@reduxjs/toolkit';
import { ArticleType, ArticleView, type IArticle } from '@entities/Article';
import type { SortOrder } from '@shared/types/globals.types';
import { ArticleSortField } from 'src/widgets/ArticlesFilters';

export interface IArticlesPageSchema extends EntityState<IArticle, string>{
	isLoading?: boolean;
	error?: string;
	view: ArticleView;
	page: number;
	limit: number;
	hasMore: boolean;
	order: SortOrder;
	sort: ArticleSortField;
	search: string;
	types: ArticleType[];
	_inited: boolean;
}