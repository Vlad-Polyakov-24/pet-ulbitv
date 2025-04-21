import { memo, useState } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Nav } from '@features/Nav';
import { ThemeSwitcher } from '@features/ThemeSwitcher';
import { LangSwitcher } from '@features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<aside className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
			<Button
				onClick={onToggle}
				className={cls.sidebar__collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>
			<Nav collapsed={collapsed} />
			<div className={cls.sidebar__switchers}>
				<ThemeSwitcher />
				<LangSwitcher />
			</div>
		</aside>
	);
});

export default Sidebar;