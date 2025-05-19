import { memo } from 'react';
import { Text } from '@shared/ui/Text';
import { VStack } from '@shared/ui/Stack';
import type { IArticleBlockText } from '../../model/types/Article.types';

type ArticleBlockTextProps = {
	className?: string;
	block: IArticleBlockText;
};

const ArticleBlockText = memo(({ className, block: { title, paragraphs } }: ArticleBlockTextProps) => (
	<VStack gap={'14'} className={className}>
		{title && <Text titleTag={'h3'} title={title} />}
		{paragraphs.map((p, i) => <Text key={i} text={p} />)}
	</VStack>
));

export { ArticleBlockText };