import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from '@shared/ui/AppLink';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { INavItem } from '../../model/types/Nav.types';
import cls from './NavItem.module.scss';

type NavItemProps = {
	item: INavItem;
	collapsed?: boolean;
};

const NavItem = memo(({ item, collapsed }: NavItemProps) => {
	const { to, text, icon } = item;
	const { t } = useTranslation('navigation');

	return (
		<AppLink key={text} theme={AppLinkTheme.SECONDARY} to={to} className={collapsed ? 'm-centred' : ''}>
			<Icon icon={icon} size={collapsed ? IconSize.SIZE_30 : IconSize.SIZE_22 } />
			{!collapsed && <span className={cls.text}>{t(text)}</span>}
		</AppLink>
	);
});

export { NavItem };