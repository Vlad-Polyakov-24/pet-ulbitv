import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Card } from '@shared/ui/Card';
import { Skeleton } from '@shared/ui/Skeleton';
import { HStack, VStack } from '@shared/ui/Stack';
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
				<VStack gap={'6'} className={cls.card__row}>
					<HStack justify={'between'} align={'center'} gap={'10'} fluid>
						<Skeleton styles={{ width: 130, height: 16 }} />
						<Skeleton styles={{ width: 30, height: 16 }} />
					</HStack>
					<Skeleton styles={{ height: 24 }} />
				</VStack>
			</>
		),
		[ArticleView.SINGLE]: () => (
			<>
				<HStack as={'header'} align={'center'} justify={'between'} gap={'10'} className={cls.card__header}>
					<HStack align={'center'} gap={'10'}>
						<Skeleton styles={{ width: 30, height: 30, borderRadius: '50%' }} />
						<Skeleton styles={{ width: 50, height: 16 }} />
					</HStack>
					<Skeleton styles={{ width: 50, height: 16 }} />
				</HStack>
				<VStack gap={'10'}>
					<div className={cls.card__row}>
						<Skeleton styles={{ height: 24 }} />
						<Skeleton styles={{ width: 60, height: 16 }} className={'mt-5'} />
					</div>
					<Skeleton styles={{ height: 150 }} />
					<div className={cls.card__row}>
						<Skeleton styles={{ height: 50 }} />
					</div>
				</VStack>
				<HStack as={'footer'} align={'center'} justify={'between'} gap={'10'} className={cls.card__footer}>
					<Skeleton styles={{ width: 150, height: 24 }} />
					<Skeleton styles={{ width: 50, height: 16 }} />
				</HStack>
			</>
		),
	};

	return (
		<Card className={classNames(cls.card, {}, [className, cls[view]])}>
			{content[view]()}
		</Card>
	);
});

export { ArticleListItemSkeleton };