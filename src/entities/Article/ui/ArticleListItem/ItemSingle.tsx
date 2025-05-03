import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Avatar } from '@shared/ui/Avatar';
import { Text, TextSize } from '@shared/ui/Text';
import { Card } from '@shared/ui/Card';
import { Image } from '@shared/ui/Image';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { ArticleBlockType, type IArticle } from '../../model/types/Article.types';
import cls from './ArticleListItem.module.scss';
import EyeIcon from '@shared/assets/icons/eye.svg';

type ItemSingleProps = {
	className?: string;
	article: IArticle;
	handleOpenArticle?: () => void;
};

const ItemSingle = memo((props: ItemSingleProps) => {
	const { className, article, handleOpenArticle } = props;
	const { author: { avatar, username }, createdAt, title, type, img, views, blocks } = article;
	const { t: tArticle } = useTranslation('article');
	const textParagraph = blocks
		.find((block) => block.type === ArticleBlockType.TEXT)?.paragraphs[0];

	return (
		<Card className={classNames(cls.card, {}, [className])}>
			<header className={classNames(cls.card__row, {}, [cls.header, cls.spaceBetween])}>
				<div className={cls.card__row}>
					<Avatar src={avatar} alt={username} size={30} />
					<Text text={username} size={TextSize.S} />
				</div>
				<Text text={createdAt} />
			</header>
			<div className={cls.card__body}>
				<div className={cls.card__bodyInner}>
					<Text title={title} size={TextSize.L} />
					<Text text={type.join(', ')} />
				</div>
				<Image src={img} alt={title} height={150} objectFit={'contain'} />
				{textParagraph && (
					<div className={cls.card__bodyInner}>
						<Text text={textParagraph} className={cls.card__paragraph} />
					</div>
				)}
			</div>
			<footer className={classNames(cls.card__row, {}, [cls.footer, cls.spaceBetween])}>
				<Button theme={ButtonTheme.OUTLINE} onClick={handleOpenArticle}>
					{tArticle('read more')}
				</Button>
				<div className={cls.card__views}>
					<Text text={String(views)} />
					<Icon icon={<EyeIcon />} size={IconSize.SIZE_14} />
				</div>
			</footer>
		</Card>
	);
});

export { ItemSingle };