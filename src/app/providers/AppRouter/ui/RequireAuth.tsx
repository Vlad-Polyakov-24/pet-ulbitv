import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getAuthData } from '@entities/User';
import { RoutePath } from '../config/routeConfig';

type RequireAuthProps = {
	children?: ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
	const isAuth = useSelector(getAuthData);
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />
	}

	return children;
};

export default RequireAuth;