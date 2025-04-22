import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Text } from '@shared/ui/Text';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import cls from './ProfileCard.module.scss';

type ProfileCardProps = {
	className?: string;
};

const ProfileCard = memo((props: ProfileCardProps) => {
	const { className } = props;
	const { t: tGlobal } = useTranslation();
	const { t: tProfile } = useTranslation('profile');
	const { t: tFields } = useTranslation('fields');
	const data = useSelector(getProfileData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);

	console.log(isLoading);
	console.log(error);

	return (
		<div className={classNames(cls.card, {}, [className])}>
			<div className={cls.card__head}>
				<Text title={tProfile('profile')} />
				<Button theme={ButtonTheme.OUTLINE}>{tGlobal('edit')}</Button>
			</div>
			<div className={cls.card__body}>
				<Input
					value={data?.firstname}
					placeholder={tFields('firstname')}
				/>
				<Input
					value={data?.lastname}
					placeholder={tFields('lastname')}
				/>
			</div>
		</div>
	);
});

export default ProfileCard;