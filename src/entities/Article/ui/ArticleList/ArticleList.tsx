import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView, type IArticle } from '../../model/types/Article.types';
import cls from './ArticleList.module.scss';

type ArticleListProps = {
	className?: string;
	articles: IArticle[];
	isLoading?: boolean;
	view?: ArticleView;
};

const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, isLoading, view = ArticleView.SINGLE } = props;

	const skeletons = new Array(view === ArticleView.GRID ? 9 : 3).fill(0).map((_, i) => (
		<ArticleListItemSkeleton key={i} view={view} />
	));

	const renderArticle = (article: IArticle) => (
		<ArticleListItem key={article.id} article={article} view={view} />
	);

	return (
		<div className={classNames(cls.articles, {}, [className])}>
			{isLoading && (
				<ul className={classNames(cls.articles__list, {}, [cls[view]])}>
					{...skeletons}
				</ul>
			)}
			{articles.length > 0 ? (
				<ul className={classNames(cls.articles__list, {}, [cls[view]])}>
					{articles.map(renderArticle)}
				</ul>
			) : null}
		</div>
	);
});

export default ArticleList;