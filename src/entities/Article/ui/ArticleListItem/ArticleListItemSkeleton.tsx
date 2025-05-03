import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Card } from '@shared/ui/Card';
import { Skeleton } from '@shared/ui/Skeleton';
import { ArticleView } from '../../model/types/Article.types';
import cls from './ArticleListItem.module.scss';

type ArticleListItemSkeletonProps = {
	className?: string;
	view: ArticleView;
};

const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {

	const content = {
		[ArticleView.GRID]: () => (
			<>
				<Skeleton styles={{ height: 200 }} />
				<div className={cls.card__body}>
					<div className={classNames(cls.card__row, {}, [cls.spaceBetween])}>
						<Skeleton styles={{ width: 130, height: 16 }} />
						<Skeleton styles={{ width: 30, height: 16 }} />
					</div>
					<Skeleton styles={{ height: 24  }} />
				</div>
			</>
		),
		[ArticleView.SINGLE]: () => (
			<>
				<div className={classNames(cls.card__row, {}, [cls.header, cls.spaceBetween])}>
					<div className={cls.card__row}>
						<Skeleton styles={{ width: 30, height: 30, borderRadius: '50%' }} />
						<Skeleton styles={{ width: 50, height: 16 }} />
					</div>
					<Skeleton styles={{ width: 50, height: 16 }} />
				</div>
				<div className={cls.card__body}>
					<div className={cls.card__bodyInner}>
						<Skeleton styles={{ height: 24 }} />
						<Skeleton styles={{ width: 60, height: 16 }} className={'mt-5'} />
					</div>
					<Skeleton styles={{ height: 150 }} />
					<div className={cls.card__bodyInner}>
						<Skeleton styles={{ height: 50 }} />
					</div>
				</div>
				<footer className={classNames(cls.card__row, {}, [cls.footer, cls.spaceBetween])}>
					<Skeleton styles={{ width: 150, height: 24 }} />
					<Skeleton styles={{ width: 50, height: 16 }} />
				</footer>
			</>
		),
	};

	return (
		<li className={cls[view]}>
			<Card className={classNames(cls.card, {}, [className])}>
				{content[view]()}
			</Card>
		</li>
	);
});

export { ArticleListItemSkeleton };