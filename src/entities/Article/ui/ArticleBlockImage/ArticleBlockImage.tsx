import { memo } from 'react';
import { Image } from '@shared/ui/Image';
import { Text, TextAlign, TextSize } from '@shared/ui/Text';
import { VStack } from '@shared/ui/Stack';
import type { IArticleBlockImage } from '../../model/types/Article.types';

type ArticleBlockImageProps = {
	className?: string;
	block: IArticleBlockImage;
};

const ArticleBlockImage = memo(({ className, block }: ArticleBlockImageProps) => (
	<VStack gap={'6'} className={className}>
		<Image src={block.src} alt={'image'} />
		{block.title && <Text title={block.title} align={TextAlign.CENTER} size={TextSize.M} />}
	</VStack>
));

export { ArticleBlockImage };