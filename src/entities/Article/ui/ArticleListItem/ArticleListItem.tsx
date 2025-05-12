import { memo } from 'react';
import { ItemGrid } from './ItemGrid';
import { ItemSingle } from './ItemSingle';
import { ArticleView, type IArticle } from '../../model/types/Article.types';
import cls from './ArticleListItem.module.scss';

type ArticleListItemProps = {
	className?: string;
	article: IArticle;
	view: ArticleView;
};

const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view } = props;

	const content = {
		[ArticleView.GRID]: () => (
			<ItemGrid className={className} article={article} />
		),
		[ArticleView.SINGLE]: () => (
			<ItemSingle className={className} article={article} />
		),
	};

	return <li className={cls[view]}>{content[view]()}</li>;
});

export { ArticleListItem };