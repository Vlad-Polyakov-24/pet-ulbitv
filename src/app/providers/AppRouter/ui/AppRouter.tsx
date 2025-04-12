import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { PageLoader } from '@features/PageLoader';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => (
	<Routes>
		{Object.values(routeConfig).map(({ element, path }) => (
			<Route
				key={path}
				path={path}
				element={(
					<Suspense fallback={<PageLoader />}>
						<main className={'main'}>{element}</main>
					</Suspense>
				)}
			/>
		))}
	</Routes>
);

export default AppRouter;
