import { memo, type CSSProperties } from 'react';
import { classNames, type Additional } from '@shared/lib/classNames';
import { VStack } from '@shared/ui/Stack';
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
		<VStack gap={'6'} className={className} style={styles}>
			{title && <p className={classNames('', {}, titleAdditional)}>{title}</p>}
			{text && <p className={classNames('', {}, textAdditional)}>{text}</p>}
		</VStack>
	);
});

export default Text;