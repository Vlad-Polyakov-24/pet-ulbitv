import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { DynamicModuleLoader, ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { Section } from '@widgets/Section';
import { Container } from '@shared/ui/Container';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Article } from '@entities/Article';
import { CommentList } from '@entities/Comment';
import { AddCommentForm } from '@features/AddComment';
import { articleCommentsSliceReducer, getArticleComments } from '../../model/slices/articleCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/articleComments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { RoutePath } from '@app/providers/AppRouter';
import cls from './ArticlePage.module.scss';

type ArticlePageProps = {
	className?: string;
};

const reducers: ReducersList = {
	articleComments: articleCommentsSliceReducer,
};

const ArticlePage = ({ className }: ArticlePageProps) => {
	const { t: tErrors } = useTranslation('errors');
	const { t: tComments } = useTranslation('comments');
	const { t: tArticle } = useTranslation('article');
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	}, [dispatch, id]);

	const handleSendComment = useCallback((comment: string) => {
		dispatch(addCommentForArticle(comment));
	}, [dispatch]);

	const handleBack = useCallback(() => {
		navigate(RoutePath.articles);
	}, [navigate]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Section className={classNames(cls.article, {}, [className])} restoreScroll>
				<Container className={cls.article__container} fluid>
					{id ? (
						<>
							<Button theme={ButtonTheme.OUTLINE} onClick={handleBack} style={{ alignSelf: 'flex-start' }}>
								{tArticle('back to list')}
							</Button>
							<Article id={id} />
							<Text title={tComments('comments')} size={TextSize.XL} />
							<AddCommentForm handleSendComment={handleSendComment} />
							<CommentList isLoading={commentsIsLoading} comments={comments} />
						</>
					) : (
						<Text align={TextAlign.CENTER} text={tErrors('article not found')} />
					)}
				</Container>
			</Section>
		</DynamicModuleLoader>
	);
};

export default ArticlePage;