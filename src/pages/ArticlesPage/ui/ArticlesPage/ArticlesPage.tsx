import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@shared/lib/classNames';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { Section } from '@shared/ui/Section';
import { Container } from '@shared/ui/Container';
import { ArticleList, ArticleView } from '@entities/Article';
import { ViewSwitcher } from '@features/ViewSwitcher';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlesPage.module.scss';

type ArticlesPageProps = {
	className?: string;
};

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);

	useEffect(() => {
		dispatch(articlesPageActions.initState());
		dispatch(fetchArticlesList({ page: 1 }));
	}, [dispatch]);

	const handleChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setView(view));
		dispatch(articlesPageActions.setPage(1));
		dispatch(fetchArticlesList({ page: 1 }));
	}, [dispatch]);

	const handleLoadNextPage = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	},  [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Section onScrollEnd={handleLoadNextPage} className={classNames(cls.articles, {}, [className])}>
				<Container fluid>
					<ViewSwitcher currentView={view} onChange={handleChangeView} />
					<ArticleList articles={articles} isLoading={isLoading} view={view} />
				</Container>
			</Section>
		</DynamicModuleLoader>
	);
};

export default ArticlesPage;