import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useTheme, Theme } from '@app/providers/ThemeProvider';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import cls from './ThemeSwitcher.module.scss';
import ThemeIcon from '@shared/assets/icons/theme.svg';

interface ThemeSwitcherProps {
	className?: string;
}

const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button theme={ButtonTheme.CLEAR} className={classNames(cls.btn, {}, [className])} onClick={toggleTheme}>
			<Icon
				icon={<ThemeIcon />}
				size={IconSize.SIZE_40}
				style={{ color: theme === Theme.DARK ? '#0115C6' : '#FFC700' }}
			/>
		</Button>
	);
});

export default ThemeSwitcher;
