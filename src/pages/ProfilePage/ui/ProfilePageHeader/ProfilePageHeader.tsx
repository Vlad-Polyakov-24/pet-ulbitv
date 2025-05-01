import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { Text } from '@shared/ui/Text';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { getProfileData, profileActions } from '@entities/Profile';
import { getAuthData } from '@entities/User';
import cls from './ProfilePageHeader.module.scss';

type ProfilePageHeaderProps = {
	className?: string;
	readonly?: boolean;
	handleSubmit?: () => void;
};

const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
	const { className, readonly, handleSubmit } = props;
	const { t: tProfile } = useTranslation('profile');
	const { t: tGlobal } = useTranslation();
	const dispatch = useAppDispatch();
	const authData = useSelector(getAuthData);
	const profileData = useSelector(getProfileData);
	const canEdit = authData?.id === profileData?.id;

	const toggleReadonly = useCallback((newState: boolean) => {
		dispatch(profileActions.setReadonly(newState));

		if (newState) {
			dispatch(profileActions.cancelEdit());
		}
	}, [dispatch]);

	return (
		<div className={classNames(cls.header, {}, [className])}>
			<Text title={tProfile('profile')} />
			<div className={cls.header__buttons}>
				{canEdit && (
					<>
						{readonly
							? (
								<Button
									theme={ButtonTheme.OUTLINE}
									onClick={() => toggleReadonly(false)}
								>
									{tGlobal('edit')}
								</Button>
							) : (
								<>
									<Button
										theme={ButtonTheme.OUTLINE}
										onClick={handleSubmit}
									>
										{tGlobal('save')}
									</Button>
									<Button
										theme={ButtonTheme.OUTLINE_RED}
										onClick={() => toggleReadonly(true)}
									>
										{tGlobal('cancel')}
									</Button>
								</>
							)}
					</>
				)}
			</div>
		</div>
	);
});

export { ProfilePageHeader };