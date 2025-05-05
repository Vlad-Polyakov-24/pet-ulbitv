import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@shared/lib/classNames';
import { DynamicModuleLoader, ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { Container } from '@shared/ui/Container';
import { ArticleList, ArticleView } from '@entities/Article';
import { ViewSwitcher } from '@features/ViewSwitcher';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView
} from '../../model/selectors/articlesPageSelectors';
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
	const error = useSelector(getArticlesPageError);

	useEffect(() => {
		dispatch(fetchArticlesList());
		dispatch(articlesPageActions.initState());
	}, [dispatch]);

	const handleChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setView(view));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<section className={classNames(cls.articles, {}, [className])}>
				<Container fluid>
					<ViewSwitcher currentView={view} onChange={handleChangeView} />
					<ArticleList articles={articles} isLoading={isLoading} view={view} />
				</Container>
			</section>
		</DynamicModuleLoader>
	);
};

export default ArticlesPage;