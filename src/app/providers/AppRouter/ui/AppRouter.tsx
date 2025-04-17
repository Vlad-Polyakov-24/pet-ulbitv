import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Loader, LoaderTheme } from '@shared/ui/Loader';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => (
	<Routes>
		{Object.values(routeConfig).map(({ element, path }) => (
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

export default AppRouter;
