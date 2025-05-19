import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { DynamicModuleLoader, ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { Section } from '@widgets/Section';
import { Container } from '@shared/ui/Container';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
import { Article, ArticleList } from '@entities/Article';
import { CommentList } from '@entities/Comment';
import { AddCommentForm } from '@features/AddComment';
import { ArticlePageHeader } from '../ArticlePageHeader/ArticlePageHeader';
import { getArticleComments } from '../../model/slices/articleCommentsSlice';
import { getArticleRecommendations } from '../../model/slices/articleRecommendationsSlice';
import { articlePageReducer } from '../../model/slices/articlePageReducer';
import { getArticleCommentsIsLoading } from '../../model/selectors/articleComments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/articleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchRecommendations } from '../../model/services/fetchRecommendations/fetchRecommendations';
import cls from './ArticlePage.module.scss';

type ArticlePageProps = {
	className?: string;
};

const reducers: ReducersList = {
	articlePage: articlePageReducer,
};

const ArticlePage = ({ className }: ArticlePageProps) => {
	const { t: tErrors } = useTranslation('errors');
	const { t: tComments } = useTranslation('comments');
	const { t: tArticle } = useTranslation('article');
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchRecommendations());
	}, [dispatch, id]);

	const handleSendComment = useCallback((comment: string) => {
		dispatch(addCommentForArticle(comment));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Section className={classNames(cls.article, {}, [className])} restoreScroll>
				<Container className={cls.article__container} fluid>
					{id ? (
						<>
							<ArticlePageHeader id={id} />
							<Article id={id} />
							<Text title={tArticle('recommendations')} titleTag={'h2'} size={TextSize.XL} />
							<ArticleList articles={recommendations} isLoading={recommendationsIsLoading} virtualized={false} />
							<Text title={tComments('comments')} titleTag={'h2'} size={TextSize.XL} />
							<AddCommentForm handleSendComment={handleSendComment} />
							<CommentList isLoading={commentsIsLoading} comments={comments} />
						</>
					) : (
						<Text align={TextAlign.CENTER} text={tErrors('article not found')} titleTag={'h3'} />
					)}
				</Container>
			</Section>
		</DynamicModuleLoader>
	);
};

export default ArticlePage;