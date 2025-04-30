import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign } from '@shared/ui/Text';
import { ArticleSkeleton } from '../ArticleSkeleton/ArticleSkeleton';
import { ArticleContent } from '../ArticleContent/ArticleContent';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { articleReducer } from '../../model/slice/articleSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { getArticleData, getArticleError, getArticleIsLoading } from '../../model/selectors/articleSelectors';

type ArticleProps = {
	className?: string;
	id: string;
};

const reducers: ReducersList = {
	article: articleReducer,
};

const Article = memo(({ className, id }: ArticleProps) => {
	const { t: tErrors } = useTranslation('errors');
	const dispatch = useAppDispatch();
	const article = useSelector(getArticleData);
	const isLoading = useSelector(getArticleIsLoading);
	const error = useSelector(getArticleError);
	let content;

	useEffect(() => {
		dispatch(fetchArticleById(id));
	}, [dispatch, id]);

	if (isLoading) {
		content = <ArticleSkeleton />;
	} else if (error) {
		content = <Text align={TextAlign.CENTER} title={tErrors(error)} />;
	} else if (article) {
		content = <ArticleContent article={article} className={className} />;
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			{content}
		</DynamicModuleLoader>
	);
});

export default Article;