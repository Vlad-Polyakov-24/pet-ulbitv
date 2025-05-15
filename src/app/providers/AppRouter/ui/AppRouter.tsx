import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { Loader, LoaderTheme } from '@shared/ui/Loader';
import { VStack } from '@shared/ui/Stack';
import RequireAuth from './RequireAuth.tsx';
import { routeConfig, type AppRouteProps } from '../config/routeConfig';

const AppRouter = () => {

	const renderWithWrapper = useCallback((route: AppRouteProps) => {
		const element = (
			<Suspense fallback={<Loader theme={LoaderTheme.PAGE} />}>
				<VStack as={'main'} align={'stretch'} justify={'stretch'} className={'main'} grow fluid>
					{route.element}
				</VStack>
			</Suspense>
		);

		return (
			<Route
				key={route.path}
				path={route. path}
				element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
			/>
		);
	}, []);

	return (
		<Routes>
			{Object.values(routeConfig).map(renderWithWrapper)}
		</Routes>
	);
};

export default AppRouter;
