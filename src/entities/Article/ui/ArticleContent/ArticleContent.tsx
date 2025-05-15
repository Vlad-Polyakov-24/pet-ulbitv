import { memo } from 'react';
import { Avatar } from '@shared/ui/Avatar';
import { Text, TextSize } from '@shared/ui/Text';
import { Icon } from '@shared/ui/Icon';
import { HStack, VStack } from '@shared/ui/Stack';
import { ArticleBlockText } from '../ArticleBlockText/ArticleBlockText';
import { ArticleBlockCode } from '../ArticleBlockCode/ArticleBlockCode';
import { ArticleBlockImage } from '../ArticleBlockImage/ArticleBlockImage';
import { ArticleBlockType, type IArticle, type IArticleBlock } from '../../model/types/Article.types';
import EyeIcon from '@shared/assets/icons/eye.svg';
import CalendarIcon from '@shared/assets/icons/calendar.svg';

type ArticleContentProps = {
	className?: string;
	article: IArticle;
};

const ArticleContent = memo(({ className, article }: ArticleContentProps) => {
	const { img, title, subtitle, views, createdAt, blocks } = article;

	const renderBlock = (block: IArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.TEXT:
				return <ArticleBlockText key={block.id} block={block} />;
			case ArticleBlockType.CODE:
				return <ArticleBlockCode key={block.id} block={block} />;
			case ArticleBlockType.IMAGE:
				return <ArticleBlockImage key={block.id} block={block} />;
			default:
				return null;
		}
	};

	return (
		<VStack gap={'20'} className={className}>
			<Avatar size={200} src={img} alt={title} className={'m-centred'} />
			<Text size={{ text: TextSize.L, title: TextSize.XL }} title={title} text={subtitle} />
			<HStack gap={'20'} align={'center'}>
				<HStack gap={'6'} align={'center'}>
					<Icon icon={<EyeIcon />} />
					<Text text={String(views)} />
				</HStack>
				<HStack gap={'6'} align={'center'}>
					<Icon icon={<CalendarIcon />} />
					<Text text={createdAt} />
				</HStack>
			</HStack>
			{blocks.map(renderBlock)}
		</VStack>
	);
});

export { ArticleContent };