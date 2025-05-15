import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Avatar } from '@shared/ui/Avatar';
import { Text, TextSize } from '@shared/ui/Text';
import { Card } from '@shared/ui/Card';
import { Image } from '@shared/ui/Image';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { HStack, VStack } from '@shared/ui/Stack';
import { RoutePath } from '@app/providers/AppRouter';
import { ArticleBlockType, type IArticle } from '../../model/types/Article.types';
import cls from './ArticleListItem.module.scss';
import EyeIcon from '@shared/assets/icons/eye.svg';

type ItemSingleProps = {
	className?: string;
	article: IArticle;
};

const ItemSingle = memo((props: ItemSingleProps) => {
	const { className, article } = props;
	const { user: { avatar, username }, createdAt, title, type, img, views, blocks, id } = article;
	const { t: tArticle } = useTranslation('article');
	const textParagraph = blocks
		.find((block) => block.type === ArticleBlockType.TEXT)?.paragraphs[0];

	return (
		<Card className={classNames(cls.card, {}, [className])}>
			<HStack as={'header'} align={'center'} justify={'between'} gap={'10'} className={cls.card__header}>
				<HStack align={'center'} gap={'10'}>
					<Avatar src={avatar ?? ''} alt={username} size={30} />
					<Text text={username} size={TextSize.S} />
				</HStack>
				<Text text={createdAt} />
			</HStack>
			<VStack gap={'10'}>
				<div className={cls.card__row}>
					<Text title={title} size={TextSize.L} />
					<Text text={type.join(', ')} />
				</div>
				<Image src={img} alt={title} height={150} objectFit={'contain'} />
				{textParagraph && (
					<div className={cls.card__row}>
						<Text text={textParagraph} className={cls.card__paragraph} />
					</div>
				)}
			</VStack>
			<HStack as={'footer'} align={'center'} justify={'between'} gap={'10'} className={cls.card__footer}>
				<Button as={Link} to={`${RoutePath.article}${id}`} theme={ButtonTheme.OUTLINE}>
					{tArticle('read more')}
				</Button>
				<HStack align={'center'} justify={'between'} gap={'6'}>
					<Text text={String(views)} />
					<Icon icon={<EyeIcon />} size={IconSize.SIZE_14} />
				</HStack>
			</HStack>
		</Card>
	);
});

export { ItemSingle };