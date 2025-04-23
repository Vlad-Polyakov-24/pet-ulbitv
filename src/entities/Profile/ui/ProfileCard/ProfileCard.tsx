import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Text, TextAlign, TextColor } from '@shared/ui/Text';
import { Loader } from '@shared/ui/Loader';
import { Avatar } from '@shared/ui/Avatar';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { ProfileForm } from '../ProfileForm/ProfileForm';
import type { IProfile, ValidateProfileErrorsMap } from '../../model/types/Profile.types';
import cls from './ProfileCard.module.scss';

type ProfileCardProps = {
	className?: string;
	profile?: IProfile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeProfile?: <T extends keyof IProfile>(value: IProfile[T], field: T) => void;
	handleSubmit?: () => void;
	validateErrors?: ValidateProfileErrorsMap;
};

const ProfileCard = memo((props: ProfileCardProps) => {
	const { className, isLoading, error, profile, readonly, onChangeProfile, handleSubmit, validateErrors } = props;
	const { t: tErrors } = useTranslation('errors');
	let content;

	if (isLoading) {
		content = <Loader className={'m-centred'} />;
	} else if (error) {
		content = (
			<Text
				title={tErrors('fetch profile failed')}
				text={tErrors('try reload page')}
				align={TextAlign.CENTER}
				color={TextColor.RED_LIGHT}
			/>
		);
	} else {
		content = (
			<>
				{validateErrors?.global && <ErrorMessage message={validateErrors.global?.[0]} />}
				{profile?.avatar && <Avatar className={'m-centred'} src={profile.avatar} alt={'Avatar'} />}
				<ProfileForm
					profile={profile}
					readonly={readonly}
					onChangeProfile={onChangeProfile}
					handleSubmit={handleSubmit}
					validateErrors={validateErrors}
				/>
			</>
		);
	}

	return (
		<div className={classNames(cls.card, { [cls.edit]: !readonly }, [className])}>
			{content}
		</div>
	);
});

export default ProfileCard;