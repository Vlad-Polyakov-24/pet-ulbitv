import { memo, useMemo, type RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { classNames } from '@shared/lib/classNames';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView, type IArticle } from '../../model/types/Article.types';
import cls from './ArticleList.module.scss';

type ListSingleProps = {
	className?: string;
	articles: IArticle[];
	isLoading?: boolean;
	view: ArticleView;
	wrapperRef?: RefObject<HTMLDivElement | null>;
};

const ListSingle = memo((props: ListSingleProps) => {
	const { className, articles, isLoading, view, wrapperRef } = props;
	const skeletonCount = 3;
	const gap = 20;
	const totalCount = useMemo(
		() => articles.length + (isLoading ? skeletonCount : 0),
		[articles.length, isLoading, skeletonCount],
	);

	const virtualizer = useVirtualizer({
		count: totalCount,
		overscan: 5,
		estimateSize: () => 390,
		getScrollElement: () => wrapperRef?.current ?? null,
	});

	return (
		<ul
			className={classNames(cls.articles, {}, [className])}
			style={{
				height: (!isLoading && !articles.length) ? 0 : `${virtualizer.getTotalSize() + gap * (totalCount - 1)}px`,
			}}
		>
			{virtualizer.getVirtualItems().map((item) => {
				const isSkeleton = item.index >= articles.length;
				const article = articles[item.index];

				return (
					<li
						key={isSkeleton ? `skeleton-${item.index}` : `article-${articles[item.index].id}`}
						data-index={item.index}
						ref={virtualizer.measureElement}
						className={cls.articles__item}
						style={{ transform: `translateY(${item.start + item.index * gap}px)` }}
					>
						{isSkeleton ? (
							<ArticleListItemSkeleton view={view}/>
						) : (
							<ArticleListItem article={article} view={view}/>
						)}
					</li>
				);
			})}
		</ul>
	);
});

export { ListSingle };