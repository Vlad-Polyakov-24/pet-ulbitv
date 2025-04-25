import type { IArticle } from './Article.types';

export interface IArticleSchema {
	isLoading: boolean;
	error?: string;
	data?: IArticle;
}