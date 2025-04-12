import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { AppLink, AppLinkTheme } from '@shared/ui/AppLink';
import { Icon, IconSize } from '@shared/ui/Icon';
import { links } from '../model/data/nav.data';
import cls from './Nav.module.scss';

type NavProps = {
	className?: string;
	collapsed?: boolean;
};

const Nav = ({ className, collapsed }: NavProps) => {
	const { t } = useTranslation();

	return (
		<nav className={classNames(cls.nav, {}, [className])}>
			{links.map(({ to, icon, text }) => (
				<AppLink key={text} theme={AppLinkTheme.SECONDARY} to={to} className={collapsed ? 'm-centred' : ''}>
					<Icon icon={icon} size={collapsed ? IconSize.SIZE_30 : IconSize.SIZE_22 } />
					{!collapsed && <span className={cls.nav__text}>{t(text)}</span>}
				</AppLink>
			))}
		</nav>
	);
};

export default Nav;