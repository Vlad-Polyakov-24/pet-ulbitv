import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ElementType } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { ButtonSize, ButtonTheme } from '../model/types/Button.types';
import cls from './Button.module.scss';

type ButtonProps<T extends ElementType = 'button'> = {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
	as?: T;
} & ButtonHTMLAttributes<HTMLButtonElement> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
	const {
		as,
		className,
		children,
		theme = ButtonTheme.BACKGROUND_INVERTED,
		square,
		size = ButtonSize.M,
		type = 'button',
		...otherProps
	} = props;
	const Component = as || 'button';

	const mods: Mods = {
		[cls.square]: square,
	};

	return (
		<Component
			type={type}
			className={classNames(cls.btn, mods, [className, cls[size], cls[theme]])}
			{...otherProps}
		>
			{children}
		</Component>
	);
};

export default Button;