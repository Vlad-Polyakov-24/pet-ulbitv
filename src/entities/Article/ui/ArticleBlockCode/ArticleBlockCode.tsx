import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './ArticleBlockCode.module.scss';

type ArticleBlockCodeProps = {
	className?: string;
};

const ArticleBlockCode = memo((props: ArticleBlockCodeProps) => {
	const { className } = props;

	return (
		<div className={classNames(cls.block, {}, [className])}></div>
	);
});

export { ArticleBlockCode };