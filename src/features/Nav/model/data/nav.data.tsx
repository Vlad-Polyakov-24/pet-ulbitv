import { RoutePath } from '@app/providers/AppRouter';
import type { INavItem } from '../types/Nav.types';
import MainIcon from '@shared/assets/icons/main.svg';
import AboutIcon from '@shared/assets/icons/about.svg';
import ProfileIcon from '@shared/assets/icons/profile.svg';
import ArticlesIcon from '@shared/assets/icons/article.svg';

export const links: INavItem[] = [
	{
		to: RoutePath.main,
		icon: <MainIcon />,
		text: 'main',
	},
	{
		to: RoutePath.about,
		icon: <AboutIcon />,
		text: 'about us',
	},
	{
		to: RoutePath.profile,
		icon: <ProfileIcon />,
		text: 'profile',
		authOnly: true,
	},
	{
		to: RoutePath.articles,
		icon: <ArticlesIcon />,
		text: 'articles',
		authOnly: true,
	},
];