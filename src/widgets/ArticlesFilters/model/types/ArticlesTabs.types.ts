import type { ReactNode } from 'react';
import { ArticleType } from '@entities/Article';

export interface IArticlesTab {
	value: ArticleType;
	content: ReactNode;
}