import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { classNames, type Additional } from '@shared/lib/classNames';
import { CardBackground, CardPadding, CardRadius, CardTheme } from '../model/types/Card.types';
import cls from './Card.module.scss';

interface ICardVisual {
	theme?: CardTheme;
	background?: CardBackground;
	padding?: CardPadding;
	radius?: CardRadius;
}

type CardProps<T extends ElementType = 'div'> = {
	as?: T;
	className?: string;
	children?: ReactNode;
	visual?: ICardVisual;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
	const { as, className, children, visual, ...rest } = props;
	const {
		theme = CardTheme.DEFAULT,
		padding = CardPadding.P_0,
		background = CardBackground.CLEAR,
		radius = CardRadius.R_0,
	} = visual || {};
	const Component = as || 'div';
	const additional: Additional = [className, cls[theme], cls[padding], cls[background], cls[radius]];

	return (
		<Component className={classNames(cls.card, {}, additional)} {...rest}>{children}</Component>
	);
};

export default Card;