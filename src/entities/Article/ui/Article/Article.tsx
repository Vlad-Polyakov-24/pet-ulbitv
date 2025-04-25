import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Text, TextAlign } from '@shared/ui/Text';
import { ArticleSkeleton } from '../ArticleSkeleton/ArticleSkeleton';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { articleReducer } from '../../model/slice/ArticleSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { getArticleData, getArticleError, getArticleIsLoading } from '../../model/selectors/articleSelectors';
import cls from './Article.module.scss';

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

	console.log('article:', article);

	if (isLoading) {
		content = <ArticleSkeleton />;
	} else if (error) {
		content = <Text align={TextAlign.CENTER} title={tErrors(error)} />;
	} else {
		content = (
			<div>
				Article!
			</div>
		);
	}

	useEffect(() => {
		dispatch(fetchArticleById(id));
	}, [dispatch, id]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.article, {}, [className])}>
				{content}
			</div>
		</DynamicModuleLoader>
	);
});

export default Article;