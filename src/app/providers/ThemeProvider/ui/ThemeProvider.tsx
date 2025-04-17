import { useMemo, useState, type ReactNode } from 'react';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { ThemeContext } from '../model/store/ThemeContext';
import { Theme } from '../model/types/ThemeProvider.types';
import { localStorageKeys } from '@shared/const/localStorage';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
	const { initialTheme, children } = props;
	const { getStorage } = useLocalStorage();
	const defaultTheme = getStorage(localStorageKeys.APP_THEME) as Theme || Theme.LIGHT;
	const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

	const defaultProps = useMemo(() => ({
		theme,
		setTheme,
	}), [theme]);

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
