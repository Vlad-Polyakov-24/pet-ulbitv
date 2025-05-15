import { memo, useMemo, Fragment, useState, useEffect, useRef, type RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { classNames } from '@shared/lib/classNames';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView, type IArticle } from '../../model/types/Article.types';
import cls from './ArticleList.module.scss';

type ListGridProps = {
	className?: string;
	articles: IArticle[];
	isLoading?: boolean;
	view: ArticleView;
	wrapperRef?: RefObject<HTMLDivElement | null>;
};

const ListGrid = memo((props: ListGridProps) => {
	const { className, articles, isLoading, view, wrapperRef } = props;
	const [containerWidth, setContainerWidth] = useState(0);
	const ulRef = useRef<HTMLUListElement>(null);
	const skeletonCount = 12;
	const minColumnWidth = 200;
	const gap = 20;
	const totalCount = useMemo(
		() => articles.length + (isLoading ? skeletonCount : 0),
		[articles.length, isLoading],
	);

	const columnCount = containerWidth
		? Math.floor((containerWidth + gap) / (minColumnWidth + gap))
		: 1;

	const columnWidth = containerWidth
		? (containerWidth - gap * (columnCount - 1)) / columnCount
		: minColumnWidth;

	const rowCount = Math.ceil(totalCount / columnCount);

	const rowVirtualizer = useVirtualizer({
		count: rowCount,
		overscan: 5,
		getScrollElement: () => wrapperRef?.current ?? null,
		estimateSize: () => 280,
	});

	const columnVirtualizer = useVirtualizer({
		horizontal: true,
		count: columnCount,
		overscan: 5,
		getScrollElement: () => wrapperRef?.current ?? null,
		estimateSize: () => columnWidth,
	});

	useEffect(() => {
		if (!ulRef.current) return;

		const ro = new ResizeObserver(entries => {
			for (const entry of entries) {
				setContainerWidth(entry.contentRect.width);
			}
		});

		ro.observe(ulRef.current);
		return () => ro.disconnect();
	}, []);

	useEffect(() => {
		rowVirtualizer.measure();
		columnVirtualizer.measure();
	}, [columnVirtualizer, containerWidth, rowVirtualizer]);

	return (
		<ul
			ref={ulRef}
			className={classNames(cls.articles, {}, [className])}
			style={{
				width: `100%`,
				height: (!isLoading && !articles.length) ? 0 : `${rowVirtualizer.getTotalSize() + gap * (rowCount - 1)}px`,
			}}
		>
			{rowVirtualizer.getVirtualItems().map((virtualRow) => (
				<Fragment key={virtualRow.key}>
					{columnVirtualizer.getVirtualItems().map((virtualColumn) => {
						const itemIndex = virtualRow.index * columnCount + virtualColumn.index;
						if (itemIndex >= totalCount) return null;

						const isSkeleton = itemIndex >= articles.length;
						const article = articles[itemIndex];

						const translateX = virtualColumn.start + virtualColumn.index * gap;
						const translateY = virtualRow.start + virtualRow.index * gap;

						return (
							<li
								key={`${virtualRow.key}-${virtualColumn.key}`}
								data-index={virtualColumn.index}
								ref={rowVirtualizer.measureElement}
								className={cls.articles__item}
								style={{
									width: `${columnWidth}px`,
									height: `${virtualRow.size}px`,
									transform: `translateX(${translateX}px) translateY(${translateY}px)`,
								}}
							>
								{isSkeleton ? (
									<ArticleListItemSkeleton view={view} />
								) : (
									<ArticleListItem article={article} view={view} />
								)}
							</li>
						);
					})}
				</Fragment>
			))}
		</ul>
	);
});

export { ListGrid };