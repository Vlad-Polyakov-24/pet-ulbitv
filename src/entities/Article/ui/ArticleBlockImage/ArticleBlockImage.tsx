import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Image } from '@shared/ui/Image';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
import type { IArticleBlockImage } from '../../model/types/Article.types';
import cls from './ArticleBlockImage.module.scss';

type ArticleBlockImageProps = {
	className?: string;
	block: IArticleBlockImage;
};

const ArticleBlockImage = memo(({ className, block }: ArticleBlockImageProps) => (
	<div className={classNames(cls.block, {}, [className])}>
		<Image src={block.src} alt={'image'} />
		{block.title && <Text title={block.title} align={TextAlign.CENTER} size={TextSize.M} />}
	</div>
));

export { ArticleBlockImage };