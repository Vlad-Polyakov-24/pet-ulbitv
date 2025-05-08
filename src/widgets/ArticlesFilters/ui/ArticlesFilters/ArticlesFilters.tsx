import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Input } from '@shared/ui/Input';
import { ViewSwitcher } from '@features/ViewSwitcher';
import { Tabs, type ITab } from '@features/Tabs';
import { ArticlesSort } from '../ArticlesSort/ArticlesSort';
import { generateTabsData } from '../../model/data/articlesTabs.data';
import { ArticleType, ArticleView } from '@entities/Article';
import { ArticleSortField } from '@widgets/ArticlesFilters';
import type { SortOrder } from '@shared/types/globals.types';
import cls from './ArticlesFilters.module.scss';

type ArticlesFiltersProps = {
	className?: string;
	view: ArticleView;
	sort: ArticleSortField;
	order: SortOrder;
	search: string;
	type: ArticleType;
	handleChangeView: (view: ArticleView) => void;
	handleChangeSort: (newSort: ArticleSortField) => void;
	handleChangeOrder: (newOrder: SortOrder) => void;
	handleChangeSearch: (search: string) => void;
	handleChangeType: (tab: ITab) => void;
};

const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
	const {
		className,
		view,
		sort,
		order,
		search,
		type,
		handleChangeView,
		handleChangeSort,
		handleChangeOrder,
		handleChangeSearch,
		handleChangeType,
	} = props;
	const { t: tFields } = useTranslation('fields');
	const { t: tArticles } = useTranslation('articles');

	const tabs = useMemo(() => generateTabsData(tArticles), [tArticles]);

	return (
		<div className={classNames(cls.filter, {}, [className])}>
			<div className={cls.filter__row}>
				<ArticlesSort
					sort={sort}
					order={order}
					handleChangeSort={handleChangeSort}
					handleChangeOrder={handleChangeOrder}
				/>
				<ViewSwitcher currentView={view} onChange={handleChangeView} />
			</div>
			<Input value={search} onChange={handleChangeSearch} placeholder={tFields('search')} />
			<Tabs
				tabs={tabs}
				value={type}
				onTabClick={handleChangeType}
			/>
		</div>
	);
});

export default ArticlesFilters;