import { memo, type CSSProperties } from 'react';
import { classNames, type Additional } from '@shared/lib/classNames';
import { getColorClass, TextColorProps } from '../lib/getColorClass';
import { getSizeClass, TextSizeProps } from '../lib/getSizeClass';
import { getAlignClass, TextAlignProps } from '../lib/getAlignClass';
import cls from './Text.module.scss';

type TextProps = {
	className?: string;
	titleClassName?: string;
	textClassName?: string;
	styles?: CSSProperties;
	title?: string;
	text?: string;
	color?: TextColorProps;
	size?: TextSizeProps;
	align?: TextAlignProps;
};

const Text = memo((props: TextProps) => {
	const { className, titleClassName, textClassName, styles, title, text, color, size, align } = props;
	const titleAdditional: Additional = [
		cls[getColorClass('title', color)],
		cls[getSizeClass('title', size)],
		cls[getAlignClass('title', align)],
		titleClassName,
	];
	const textAdditional: Additional = [
		cls[getColorClass('text', color)],
		cls[getSizeClass('text', size)],
		cls[getAlignClass('text', align)],
		textClassName,
	];

	if (!title && !text) return null;

	return (
		<div className={classNames(cls.text, {}, [className])} style={styles}>
			{title && <p className={classNames(cls.text__title, {}, titleAdditional)}>{title}</p>}
			{text && <p className={classNames(cls.text__text, {}, textAdditional)}>{text}</p>}
		</div>
	);
});

export default Text;