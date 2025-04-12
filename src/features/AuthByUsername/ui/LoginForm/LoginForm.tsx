import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { getLoginInputs } from '../../model/data/form.data';
import cls from './LoginForm.module.scss';

type LoginFormProps = {
	className?: string;
};

const LoginForm = ({ className }: LoginFormProps) => {
	const { t } = useTranslation();
	const [values, setValues] = useState<Record<string, string>>({ username: '', password: '' });
	const inputs = getLoginInputs(t);

	const handleChange = useCallback((fieldName: string, value: string) => {
		setValues((prevState)=> ({ ...prevState, [fieldName]: value }));
	}, []);

	return (
		<form className={classNames(cls.form, {}, [className])}>
			{inputs.map(({ name, placeholder, label }) => (
				<Input
					key={name}
					name={name}
					label={label}
					placeholder={placeholder}
					value={values[name]}
					onChange={(value) => handleChange(name, value)}
				/>
			))}
			<Button className={'ml-a'}>
				{t('login')}
			</Button>
		</form>
	);
};

export default LoginForm;