import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from '@app/providers/AppRouter';
import { Header } from '@widgets/Header';
import { Sidebar } from '@widgets/Sidebar';
import { getUserIsMounted } from '@entities/User';
import { HStack, VStack } from '@shared/ui/Stack';

const AppLayout = () => {
	const isMounted = useSelector(getUserIsMounted);

	return (
		<VStack align={'stretch'} className={'app'} fluid>
			<Suspense fallback={null}>
				<Header />
				<HStack align={'stretch'} className={'app__inner'} grow fluid>
					<Sidebar />
					{isMounted && <AppRouter />}
				</HStack>
			</Suspense>
		</VStack>
	);
};

export default AppLayout;