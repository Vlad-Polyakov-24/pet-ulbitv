import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
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
			<ItemGrid className={classNames(cls[view], {}, [className])} article={article} />
		),
		[ArticleView.SINGLE]: () => (
			<ItemSingle className={classNames(cls[view], {}, [className])} article={article} />
		),
	};

	return content[view]();
});

export { ArticleListItem };