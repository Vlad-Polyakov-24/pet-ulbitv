import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
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
	getProfileValidateErrors,
	profileActions,
	type IProfile,
} from '@entities/Profile';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = () =>  {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const profile = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);

	useEffect(() => {
		if (id) {
			dispatch(fetchProfileData(id));
		}
	}, [dispatch, id]);

	const onChangeProfile = useCallback(
		<T extends keyof IProfile>(value: IProfile[T], field: T) => {
			dispatch(profileActions.setProfileData({ [field]: value }));
		},
		[dispatch]
	);

	const handleSubmit = useCallback(
		async () => {
			const result = await dispatch(updateProfileData());

			if (result.meta.requestStatus === 'rejected') return;

			dispatch(profileActions.setReadonly(true));
		},
		[dispatch]);

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
						validateErrors={validateErrors}
					/>
				</Container>
			</section>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;
