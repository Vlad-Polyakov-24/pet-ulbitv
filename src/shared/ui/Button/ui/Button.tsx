import type { ButtonHTMLAttributes } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { ButtonSize, ButtonTheme } from '../model/types/Button.types';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
}

const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		theme = ButtonTheme.BACKGROUND_INVERTED,
		square,
		size = ButtonSize.M,
		type = 'button',
		...otherProps
	} = props;

	const mods: Mods = {
		[cls.square]: square,
	};

	return (
		<button
			type={type}
			className={classNames(cls.btn, mods, [className, cls[size], cls[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;