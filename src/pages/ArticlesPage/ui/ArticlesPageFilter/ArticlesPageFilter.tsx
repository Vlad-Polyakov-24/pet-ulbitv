import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { useDebounce } from '@shared/hooks/useDebounce';
import { ArticlesFilters, ArticleSortField } from '@widgets/ArticlesFilters';
import { changeView } from '../../model/services/changeView/changeView';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { ArticleType, ArticleView } from '@entities/Article';
import type { SortOrder } from '@shared/types/globals.types';
import type { ITab } from '@features/Tabs';

type ArticlesPageFilterProps = {
	className?: string;
};

const ArticlesPageFilter = memo(({ className }: ArticlesPageFilterProps) => {
	const dispatch = useAppDispatch();
	const view = useSelector(getArticlesPageView);
	const sort = useSelector(getArticlesPageSort);
	const order = useSelector(getArticlesPageOrder);
	const search = useSelector(getArticlesPageSearch);
	const type = useSelector(getArticlesPageType);

	const fetchData = useCallback(() => {
		dispatch(fetchArticlesList({ replace: true }));
	}, [dispatch]);

	const debouncedFetchData = useDebounce(fetchData, 500);

	const handleChangeView = useCallback((view: ArticleView) => {
		dispatch(changeView({ view }));
	}, [dispatch]);

	const handleChangeSort = useCallback((newSort: ArticleSortField) => {
		dispatch(articlesPageActions.setSort(newSort));
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const handleChangeOrder = useCallback((newOrder: SortOrder) => {
		dispatch(articlesPageActions.setOrder(newOrder));
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const handleChangeSearch = useCallback((search: string) => {
		dispatch(articlesPageActions.setSearch(search));
		dispatch(articlesPageActions.setPage(1));
		debouncedFetchData();
	}, [debouncedFetchData, dispatch]);

	const handleChangeType = useCallback((tab: ITab) => {
		dispatch(articlesPageActions.setType(tab.value as ArticleType));
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	return (
		<ArticlesFilters
			className={className}
			view={view}
			sort={sort}
			order={order}
			search={search}
			type={type}
			handleChangeView={handleChangeView}
			handleChangeOrder={handleChangeOrder}
			handleChangeSort={handleChangeSort}
			handleChangeSearch={handleChangeSearch}
			handleChangeType={handleChangeType}
		/>
	);
});

export { ArticlesPageFilter };