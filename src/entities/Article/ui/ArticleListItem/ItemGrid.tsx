import { memo } from 'react';
import { Link } from 'react-router';
import { classNames } from '@shared/lib/classNames';
import { Text } from '@shared/ui/Text';
import { Image } from '@shared/ui/Image';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Card } from '@shared/ui/Card';
import { HStack } from '@shared/ui/Stack';
import { RoutePath } from '@app/providers/AppRouter';
import type { IArticle } from '@entities/Article';
import cls from './ArticleListItem.module.scss';
import EyeIcon from '@shared/assets/icons/eye.svg';

type ItemGridProps = {
	className?: string;
	article: IArticle;
};

const ItemGrid = memo((props: ItemGridProps) => {
	const { className, article } = props;
	const { createdAt, img, title, type, views, id } = article;

	return (
		<Card as={Link} to={`${RoutePath.article}${id}`} className={classNames(cls.card, {}, [className])}>
			<Text text={createdAt} className={cls.card__date} />
			<Image src={img} alt={title} height={200} />
			<div className={cls.card__row}>
				<HStack gap={'10'} justify={'between'}>
					<Text text={type.join(', ')} textClassName={cls.card__types} />
					<HStack align={'center'} justify={'between'} gap={'6'}>
						<Text text={String(views)} />
						<Icon icon={<EyeIcon />} size={IconSize.SIZE_14} />
					</HStack>
				</HStack>
				<Text title={title} titleClassName={cls.card__title} />
			</div>
		</Card>
	);
});

export { ItemGrid };