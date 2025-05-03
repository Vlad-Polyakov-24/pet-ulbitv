import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './Card.module.scss';

type CardProps<T extends ElementType = 'div'> = {
	as?: T;
	className?: string;
	children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
	const { as, className, children, ...rest } = props;
	const Component = as || 'div';

	return (
		<Component className={classNames(cls.card, {}, [className])} {...rest}>{children}</Component>
	);
};

export default Card;