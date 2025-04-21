import type { ReactNode } from 'react';

export interface INavItem {
	to: string;
	icon: ReactNode,
	text: string,
}