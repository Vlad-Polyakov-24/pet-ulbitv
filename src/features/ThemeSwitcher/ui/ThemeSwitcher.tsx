import { classNames } from '@shared/lib/classNames';
import { useTheme, Theme } from '@app/providers/ThemeProvider';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import LightIcon from '@shared/assets/icons/theme-light.svg';
import DarkIcon from '@shared/assets/icons/theme-dark.svg';

interface ThemeSwitcherProps {
	className?: string;
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button theme={ButtonTheme.CLEAR} className={classNames('', {}, [className])} onClick={toggleTheme}>
			<Icon
				icon={theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
				size={IconSize.SIZE_40}
				style={{ color: theme === Theme.DARK ? '#0115C6' : '#FFC700' }}
			/>
		</Button>
	);
};

export default ThemeSwitcher;
