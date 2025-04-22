import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Loader, LoaderTheme } from '@shared/ui/Loader';
import { routeConfig } from '../config/routeConfig';
import { useSelector } from 'react-redux';
import { getAuthData } from '@entities/User';

const AppRouter = () => {
	const isAuth = useSelector(getAuthData);

	const routes = Object
		.values(routeConfig)
		.filter((route) => !(route.authOnly && !isAuth));

	return (
		<Routes>
			{routes.map(({ element, path }) => (
				<Route
					key={path}
					path={path}
					element={(
						<Suspense fallback={<Loader theme={LoaderTheme.PAGE} />}>
							<main className={'main'}>{element}</main>
						</Suspense>
					)}
				/>
			))}
		</Routes>
	);
};

export default AppRouter;
