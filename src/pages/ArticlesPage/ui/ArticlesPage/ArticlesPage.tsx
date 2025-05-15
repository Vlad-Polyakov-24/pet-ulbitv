import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { classNames } from '@shared/lib/classNames';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { Section } from '@widgets/Section';
import { Container } from '@shared/ui/Container';
import { ArticleList } from '@entities/Article';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';
import { articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlesPage.module.scss';

type ArticlesPageProps = {
	className?: string;
};

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);

	useEffect(() => {
		dispatch(initArticlesPage(searchParams));
	}, [dispatch, searchParams]);

	const handleLoadNextPage = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	},  [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Section
				className={classNames(cls.articles, {}, [className])}
				wrapperRef={scrollRef}
				onScrollEnd={handleLoadNextPage}
				restoreScroll
			>
				<Container className={cls.articles__container} fluid>
					<ArticlesPageFilter />
					<ArticleList articles={articles} isLoading={isLoading} view={view} wrapperRef={scrollRef} />
				</Container>
			</Section>
		</DynamicModuleLoader>
	);
};

export default ArticlesPage;