import { memo, Fragment, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Input } from '@shared/ui/Input';
import { CurrencySelect } from '@entities/Currency';
import { CountrySelect } from '@entities/Country';
import { inputs } from '../../model/data/profileForm.data';
import type { IProfile, ValidateProfileErrorsMap } from '../../model/types/Profile.types';
import cls from './ProfileForm.module.scss';

type ProfileFormProps = {
	className?: string;
	profile?: IProfile;
	readonly?: boolean;
	onChangeProfile?: <T extends keyof IProfile>(value: IProfile[T], field: T) => void;
	handleSubmit?: () => void;
	validateErrors?: ValidateProfileErrorsMap;
};

const ProfileForm = memo((props: ProfileFormProps) => {
	const { className, profile, readonly, onChangeProfile, handleSubmit, validateErrors } = props;
	const { t: tFields } = useTranslation('fields');

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSubmit?.();
	};

	return (
		<form className={classNames(cls.form, {}, [className])} onSubmit={onSubmit}>
			{inputs.column.map(({ name }) => (
				<Input
					key={name}
					value={profile?.[name]}
					label={tFields(name)}
					placeholder={tFields(name)}
					readOnly={readonly}
					onChange={(value) => onChangeProfile?.(value, name)}
					error={validateErrors?.[name]?.[0]}
				/>
			))}
			<div className={cls.form__row}>
				{inputs.row.map(({ name }) => (
					<Fragment key={name}>
						{name === 'country' && (
							<CountrySelect
								value={profile?.[name]}
								label={tFields(name)}
								disabled={readonly}
								onChange={(value) => onChangeProfile?.(value, name)}
								error={validateErrors?.[name]?.[0]}
							/>
						)}
						{name === 'currency' && (
							<CurrencySelect
								value={profile?.[name]}
								label={tFields(name)}
								disabled={readonly}
								onChange={(value) => onChangeProfile?.(value, name)}
								error={validateErrors?.[name]?.[0]}
							/>
						)}
					</Fragment>
				))}
			</div>
		</form>
	);
});

export { ProfileForm };