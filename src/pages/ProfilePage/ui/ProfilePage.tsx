import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { Container } from '@shared/ui/Container';
import { profileReducer } from '@entities/Profile';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = () => {
	const { t } = useTranslation('profile');

	return (
		<DynamicModuleLoader reducers={reducers}>
			<section className={cls.profile}>
				<Container fluid>
					{t('title')}
				</Container>
			</section>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
