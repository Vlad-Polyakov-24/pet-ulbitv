import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
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
	const { t: tArticles } = useTranslation('articles');

	const skeletons = new Array(view === ArticleView.GRID ? 9 : 3).fill(0).map((_, i) => (
		<ArticleListItemSkeleton key={i} view={view} />
	));

	const renderArticle = (article: IArticle) => (
		<ArticleListItem key={article.id} article={article} view={view} />
	);

	return (
		<ul className={classNames(cls.articles, {}, [cls[view], className])}>
			{(!isLoading && articles.length === 0) && (
				<Text title={tArticles('articles not found')} align={TextAlign.CENTER} size={TextSize.L} />
			)}
			{articles.map(renderArticle)}
			{isLoading && skeletons}
		</ul>
	);
});

export default ArticleList;