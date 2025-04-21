import { RoutePath } from '@app/providers/AppRouter';
import { INavItem } from '../types/Nav.types';
import MainIcon from '@shared/assets/icons/main-20-20.svg';
import AboutIcon from '@shared/assets/icons/about-20-20.svg';
import ProfileIcon from '@shared/assets/icons/profile-20-20.svg';

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
	},
];