import { memo } from 'react';
import { Code } from '@features/Code';
import type { IArticleBlockCode } from '../../model/types/Article.types';

type ArticleBlockCodeProps = {
	className?: string;
	block: IArticleBlockCode;
};

const ArticleBlockCode = memo(({ className, block }: ArticleBlockCodeProps) => (
	<div className={className}>
		<Code text={block.code} />
	</div>
));

export { ArticleBlockCode };