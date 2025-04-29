import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Text } from '@shared/ui/Text';
import type { IArticleBlockText } from '../../model/types/Article.types';
import cls from './ArticleBlockText.module.scss';

type ArticleBlockTextProps = {
	className?: string;
	block: IArticleBlockText;
};

const ArticleBlockText = memo(({ className, block }: ArticleBlockTextProps) => {
	const { title, paragraphs } = block;

	return (
		<div className={classNames(cls.block, {}, [className])}>
			{title && <Text title={title} />}
			{paragraphs.map((p, i) => <Text key={i} text={p} />)}
		</div>
	);
});

export { ArticleBlockText };