import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './ArticleBlockImage.module.scss';

type ArticleBlockImageProps = {
	className?: string;
};

const ArticleBlockImage = memo((props: ArticleBlockImageProps) => {
	const { className } = props;

	return (
		<div className={classNames(cls.block, {}, [className])}></div>
	);
});

export { ArticleBlockImage };