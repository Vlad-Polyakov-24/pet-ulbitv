import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generateSortOptions } from '../../model/data/articlesSort.data';
import { Select, type ISelectOptions } from '@shared/ui/Select';
import { HStack } from '@shared/ui/Stack';
import type { SortOrder } from '@shared/types/globals.types';
import { ArticleSortField } from '../../model/types/ArticlesFilters.types';
import cls from './ArticlesSort.module.scss';

type ArticlesSortProps = {
	className?: string;
	sort: ArticleSortField;
	order: SortOrder;
	handleChangeSort: (newSort: ArticleSortField) => void;
	handleChangeOrder: (newOrder: SortOrder) => void;
};

const ArticlesSort = memo((props: ArticlesSortProps) => {
	const { className, sort, order, handleChangeSort, handleChangeOrder } = props;
	const { t: tFields } = useTranslation('fields');
	const { t: tArticles } = useTranslation('articles');

	const orderOptions = useMemo<ISelectOptions<SortOrder>[]>(
		() => generateSortOptions({ options: ['asc', 'desc'], t: tFields }),
		[tFields]
	);

	const sortOptions = useMemo<ISelectOptions<ArticleSortField>[]>(
		() => generateSortOptions({
			options: [ArticleSortField.CREATED, ArticleSortField.TITLE, ArticleSortField.VIEWS],
			t: tArticles
		}),
		[tArticles]
	);

	return (
		<HStack className={className} align={'center'} gap={'10'} grow>
			<Select
				className={cls.sort}
				options={sortOptions}
				label={tFields('sortBy')}
				orientation={'horizontal'}
				value={sort}
				onChange={handleChangeSort}
			/>
			<Select
				className={cls.order}
				options={orderOptions}
				label={tFields('by')}
				orientation={'horizontal'}
				value={order}
				onChange={handleChangeOrder}
			/>
		</HStack>
	);
});

export { ArticlesSort };