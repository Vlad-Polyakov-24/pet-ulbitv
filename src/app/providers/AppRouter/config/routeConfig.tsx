import type { RouteProps } from 'react-router';
import { NotFoundPage } from '@pages/NotFoundPage';
import { MainPage } from '@pages/MainPage';
import { AboutPage } from '@pages/AboutPage';
import { ProfilePage } from '@pages/ProfilePage';
import { ArticlePage } from '@pages/ArticlePage';
import { ArticlesPage } from '@pages/ArticlesPage';

export type AppRouteProps = RouteProps & {
	authOnly?: boolean;
}

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLE = 'article',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.PROFILE]: '/profile/',
	[AppRoutes.ARTICLES]: '/articles',
	[AppRoutes.ARTICLE]: '/articles/',
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage />,
	},
	[AppRoutes.PROFILE]: {
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLE]: {
		path: `${RoutePath.article}:id`,
		element: <ArticlePage />,
		authOnly: true,
	},
	[AppRoutes.ARTICLES]: {
		path: RoutePath.articles,
		element: <ArticlesPage />,
		authOnly: true,
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
