import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@shared/lib/classNames';
import { getAuthData } from '@entities/User';
import { NavItem } from '../NavItem/NavItem';
import { getNavLinks } from '../../model/selectors/navSelectors';
import cls from './Nav.module.scss';

type NavProps = {
	className?: string;
	collapsed?: boolean;
};

const Nav = memo(({ className, collapsed }: NavProps) => {
	const isAuth = useSelector(getAuthData);
	const links = useSelector(getNavLinks);

	const navLinks = useMemo(
		() => links
			.filter((link) => !(link.authOnly && !isAuth))
			.map((item) => <NavItem key={item.to} item={item} collapsed={collapsed}/>),
		[collapsed, isAuth, links]);

	return (
		<nav className={classNames(cls.nav, {}, [className])}>
			{...navLinks}
		</nav>
	);
});

export default Nav;