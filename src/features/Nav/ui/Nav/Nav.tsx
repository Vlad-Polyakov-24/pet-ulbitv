import { memo, useMemo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { NavItem } from '../NavItem/NavItem';
import { links } from '../../model/data/nav.data';
import cls from './Nav.module.scss';

type NavProps = {
	className?: string;
	collapsed?: boolean;
};

const Nav = memo(({ className, collapsed }: NavProps) => {
	const navLinks = useMemo(() => links.map((item) => (
		<NavItem item={item} collapsed={collapsed} />
	)), [collapsed]);

	return (
		<nav className={classNames(cls.nav, {}, [className])}>
			{...navLinks}
		</nav>
	);
});

export default Nav;