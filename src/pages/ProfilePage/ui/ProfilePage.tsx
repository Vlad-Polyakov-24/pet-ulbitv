import { useEffect } from 'react';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { Container } from '@shared/ui/Container';
import { ProfileCard, fetchProfileData, profileReducer } from '@entities/Profile';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<section className={cls.profile}>
				<Container fluid>
					<ProfileCard />
				</Container>
			</section>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
