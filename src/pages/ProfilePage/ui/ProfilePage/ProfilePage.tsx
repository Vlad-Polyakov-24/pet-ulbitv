import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { Container } from '@shared/ui/Container';
import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';
import {
	ProfileCard,
	fetchProfileData,
	updateProfileData,
	profileReducer,
	getProfileForm,
	getProfileIsLoading,
	getProfileError,
	getProfileReadonly,
	profileActions,
	type IProfile,
} from '@entities/Profile';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const profile = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);

	useEffect(() => {
		dispatch(fetchProfileData());
	}, [dispatch]);

	const onChangeProfile = useCallback(
		<T extends keyof IProfile>(value: IProfile[T], field: T) => {
			dispatch(profileActions.setProfileData({ [field]: value }));
		},
		[dispatch]
	);

	const handleSubmit = useCallback(() => {
		dispatch(updateProfileData());
		dispatch(profileActions.setReadonly(true));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<section className={cls.profile}>
				<Container className={cls.profile__container} fluid>
					<ProfilePageHeader readonly={readonly} handleSubmit={handleSubmit} />
					<ProfileCard
						profile={profile}
						isLoading={isLoading}
						error={error}
						readonly={readonly}
						onChangeProfile={onChangeProfile}
						handleSubmit={handleSubmit}
					/>
				</Container>
			</section>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
