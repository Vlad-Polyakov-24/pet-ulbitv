import { useContext } from 'react';
import { ThemeContext } from '../model/store/ThemeContext';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { Theme } from '../model/types/ThemeProvider.types';
import { localStorageKeys } from '@shared/const/localStorage';

interface UseThemeResult {
	toggleTheme: () => void;
	theme?: Theme;
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);
	const { setStorage } = useLocalStorage();

	const toggleTheme = () => {
		let newTheme: Theme;

		switch (theme) {
			case Theme.DARK:
				newTheme = Theme.LIGHT;
				break;
			case Theme.LIGHT:
				newTheme = Theme.ORANGE;
				break;
			case Theme.ORANGE:
				newTheme = Theme.DARK;
				break;
			default:
				newTheme = Theme.LIGHT;
		}
		setTheme?.(newTheme);
		document.body.className = newTheme;
		setStorage(localStorageKeys.APP_THEME, newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
	};
}
