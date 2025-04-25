import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './ArticleBlockText.module.scss';

type ArticleBlockTextProps = {
	className?: string;
};

const ArticleBlockText = memo((props: ArticleBlockTextProps) => {
	const { className } = props;

	return (
		<div className={classNames(cls.block, {}, [className])}></div>
	);
});

export { ArticleBlockText };