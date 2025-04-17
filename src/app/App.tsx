import { useEffect } from 'react';
import { AppLayout } from '@app/layouts/AppLayout';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { userActions } from '@entities/User';

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch]);

	return <AppLayout />;
};

export default App;
