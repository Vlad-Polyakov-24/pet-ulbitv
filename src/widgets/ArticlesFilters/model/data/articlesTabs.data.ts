import type { TFunction } from 'i18next';
import { ArticleType } from '@entities/Article';
import type { IArticlesTab } from '../types/ArticlesTabs.types';

export const generateTabsData = (t: TFunction): IArticlesTab[] =>
	Object.values(ArticleType).map((type) => ({
		value: type,
		content: t(type.toLowerCase()),
	}));