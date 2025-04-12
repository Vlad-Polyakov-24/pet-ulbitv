import { RoutePath } from '@app/providers/AppRouter';
import MainIcon from '@shared/assets/icons/main-20-20.svg';
import AboutIcon from '@shared/assets/icons/about-20-20.svg';

export const links = [
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
];