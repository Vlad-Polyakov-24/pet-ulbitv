import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ItemGrid } from './ItemGrid';
import { ItemSingle } from './ItemSingle';
import { RoutePath } from '@app/providers/AppRouter';
import { ArticleView, type IArticle } from '../../model/types/Article.types';
import cls from './ArticleListItem.module.scss';

type ArticleListItemProps = {
	className?: string;
	article: IArticle;
	view: ArticleView;
};

const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view } = props;
	const navigate = useNavigate();

	const handleOpenArticle = useCallback(() => {
		navigate(`${RoutePath.article}${article.id}`);
	}, [article.id, navigate]);

	const content = {
		[ArticleView.GRID]: () => (
			<ItemGrid className={className} article={article} handleOpenArticle={handleOpenArticle} />
		),
		[ArticleView.SINGLE]: () => (
			<ItemSingle className={className} article={article} handleOpenArticle={handleOpenArticle} />
		),
	};

	return <li className={cls[view]}>{content[view]()}</li>;
});

export { ArticleListItem };