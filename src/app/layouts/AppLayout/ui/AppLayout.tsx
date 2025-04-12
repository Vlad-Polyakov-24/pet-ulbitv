import { Suspense } from 'react';
import { Header } from '@widgets/Header';
import { Sidebar } from '@widgets/Sidebar';
import { AppRouter } from '@app/providers/AppRouter';

const AppLayout = () => (
	<div className={'app'}>
		<Suspense fallback>
			<Header />
			<div className={'app__inner'}>
				<Sidebar />
				<AppRouter />
			</div>
		</Suspense>
	</div>
);

export default AppLayout;