import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { DynamicModuleLoader, ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { Container } from '@shared/ui/Container';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
import { Article } from '@entities/Article';
import { CommentList } from '@entities/Comment';
import { AddCommentForm } from '@features/AddComment';
import { articleCommentsSliceReducer, getArticleComments } from '../../model/slices/articleCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/articleComments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
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

	return (
		<DynamicModuleLoader reducers={reducers}>
			<section className={classNames(cls.article, {}, [className])}>
				<Container className={cls.article__container} fluid>
					{id ? (
						<>
							<Article id={id} />
							<Text title={tComments('comments')} size={TextSize.XL} />
							<AddCommentForm handleSendComment={handleSendComment} />
							<CommentList isLoading={commentsIsLoading} comments={comments} />
						</>
					) : (
						<Text align={TextAlign.CENTER} text={tErrors('article not found')} />
					)}
				</Container>
			</section>
		</DynamicModuleLoader>
	);
};

export default ArticlePage;