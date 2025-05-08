import type { TFunction } from 'i18next';
import type { ITab } from '@features/Tabs';
import { ArticleType } from '@entities/Article';

export const generateTabsData = (t: TFunction): ITab[] =>
	Object.values(ArticleType).map((type) => ({
		value: type,
		content: t(type.toLowerCase()),
	}));