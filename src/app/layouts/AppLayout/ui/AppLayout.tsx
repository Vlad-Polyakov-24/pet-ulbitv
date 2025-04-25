import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from '@app/providers/AppRouter';
import { Header } from '@widgets/Header';
import { Sidebar } from '@widgets/Sidebar';
import { getUserIsMounted } from '@entities/User';

const AppLayout = () => {
	const isMounted = useSelector(getUserIsMounted);

	return (
		<div className={'app'}>
			<Suspense fallback={null}>
				<Header />
				<div className={'app__inner'}>
					<Sidebar />
					{isMounted && <AppRouter />}
				</div>
			</Suspense>
		</div>
	);
};

export default AppLayout;