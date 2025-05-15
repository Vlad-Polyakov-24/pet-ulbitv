import { memo, Fragment, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@shared/ui/Input';
import { HStack, VStack } from '@shared/ui/Stack';
import { CurrencySelect } from '@entities/Currency';
import { CountrySelect } from '@entities/Country';
import { inputs } from '../../model/data/profileForm.data';
import type { IProfile, ValidateProfileErrorsMap } from '../../model/types/Profile.types';

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
		<VStack as={'form'} gap={'10'} className={className} onSubmit={onSubmit} fluid>
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
			<HStack align={'center'} gap={'10'} fluid>
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
			</HStack>
		</VStack>
	);
});

export { ProfileForm };