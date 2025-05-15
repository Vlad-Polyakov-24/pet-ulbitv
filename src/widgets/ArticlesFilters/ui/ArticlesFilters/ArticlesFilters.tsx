import { memo, useMemo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Input } from '@shared/ui/Input';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { HStack, VStack } from '@shared/ui/Stack';
import { ViewSwitcher } from '@features/ViewSwitcher';
import { ArticlesTabs } from '../ArticlesTabs/ArticlesTabs';
import { ArticlesSort } from '../ArticlesSort/ArticlesSort';
import { generateTabsData } from '../../model/data/articlesTabs.data';
import { RoutePath } from '@app/providers/AppRouter';
import { ArticleType, ArticleView } from '@entities/Article';
import { ArticleSortField } from '@widgets/ArticlesFilters';
import type { SortOrder } from '@shared/types/globals.types';

type ArticlesFiltersProps = {
	className?: string;
	view: ArticleView;
	sort: ArticleSortField;
	order: SortOrder;
	search: string;
	types: ArticleType[];
	handleChangeView: (view: ArticleView) => void;
	handleChangeSort: (newSort: ArticleSortField) => void;
	handleChangeOrder: (newOrder: SortOrder) => void;
	handleChangeSearch: (search: string) => void;
	handleChangeType: (types: ArticleType[]) => void;
};

const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
	const {
		className,
		view,
		sort,
		order,
		search,
		types,
		handleChangeView,
		handleChangeSort,
		handleChangeOrder,
		handleChangeSearch,
		handleChangeType,
	} = props;
	const { t: tFields } = useTranslation('fields');
	const { t: tArticle } = useTranslation('article');
	const { t: tArticles } = useTranslation('articles');

	const tabs = useMemo(() => generateTabsData(tArticles), [tArticles]);

	return (
		<VStack gap={'10'} className={className}>
			<HStack align={'center'} gap={'20'} fluid>
				<ArticlesSort
					sort={sort}
					order={order}
					handleChangeSort={handleChangeSort}
					handleChangeOrder={handleChangeOrder}
				/>
				<Button as={Link} to={RoutePath.article_create} theme={ButtonTheme.OUTLINE}>
					{tArticle('create article')}
				</Button>
				<ViewSwitcher currentView={view} onChange={handleChangeView} />
			</HStack>
			<Input value={search} onChange={handleChangeSearch} placeholder={tFields('search')} />
			<ArticlesTabs
				tabs={tabs}
				currentTypes={types}
				onTabClick={handleChangeType}
			/>
		</VStack>
	);
});

export default ArticlesFilters;