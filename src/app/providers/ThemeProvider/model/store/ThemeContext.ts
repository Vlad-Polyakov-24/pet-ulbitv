import { createContext } from 'react';
import { Theme } from '../types/ThemeProvider.types';

export interface ThemeContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});