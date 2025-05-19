import { memo, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
import { ListGrid } from './ListGrid';
import { ListSingle } from './ListSingle';
import { ArticleView, type IArticle } from '../../model/types/Article.types';

type ArticleListProps = {
	className?: string;
	articles: IArticle[];
	isLoading?: boolean;
	view?: ArticleView;
	wrapperRef?: RefObject<HTMLDivElement | null>;
	virtualized?: boolean;
};

const ArticleList = memo(({ view = ArticleView.GRID, ...rest }: ArticleListProps) => {
	const { t: tArticles } = useTranslation('articles');

	const listMap = {
		[ArticleView.GRID]: () => <ListGrid view={view} {...rest} />,
		[ArticleView.SINGLE]: () => <ListSingle view={view} {...rest} />,
	};

	return (
		<>
			{listMap[view]()}
			{(!rest.isLoading && rest.articles.length === 0) && (
				<Text
					title={tArticles('articles not found')}
					titleTag={'h3'}
					align={TextAlign.CENTER}
					size={TextSize.L}
				/>
			)}
		</>
	);
});

export default ArticleList;