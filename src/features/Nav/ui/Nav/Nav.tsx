import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@shared/lib/classNames';
import { getAuthData } from '@entities/User';
import { NavItem } from '../NavItem/NavItem';
import { links } from '../../model/data/nav.data';
import cls from './Nav.module.scss';

type NavProps = {
	className?: string;
	collapsed?: boolean;
};

const Nav = memo(({ className, collapsed }: NavProps) => {
	const isAuth = useSelector(getAuthData);

	const navLinks = useMemo(
		() => links
			.filter((link) => !(link.authOnly && !isAuth))
			.map((item) => <NavItem key={item.to} item={item} collapsed={collapsed}/>),
		[collapsed, isAuth]);

	return (
		<nav className={classNames(cls.nav, {}, [className])}>
			{...navLinks}
		</nav>
	);
});

export default Nav;