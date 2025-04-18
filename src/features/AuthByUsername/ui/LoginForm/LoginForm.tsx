import { useCallback, useMemo, type FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { classNames } from '@shared/lib/classNames';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername.ts';
import { Input } from '@shared/ui/Input';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { Text, TextColor } from '@shared/ui/Text';
import { Loader, LoaderTheme } from '@shared/ui/Loader';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginInputs } from '../../model/data/form.data';
import { ILoginInputs } from '../../model/types/LoginForm.types';
import cls from './LoginForm.module.scss';

type LoginFormProps = {
	className?: string;
	closeModal?: () => void;
};

const initialReducer: ReducersList = {
	login: loginReducer,
};

const LoginForm = ({ className, closeModal }: LoginFormProps) =>  {
	const { t: tAuth } = useTranslation('auth');
	const { t: tFields } = useTranslation('fields');
	const { t: tErrors } = useTranslation('errors');
	const dispatch = useAppDispatch();
	const loginForm = useSelector(getLoginState);
	const { username, password, error, isLoading } = loginForm;
	const inputs = getLoginInputs(tFields);

	const actions = useMemo(() => ({
		[ILoginInputs.USERNAME]: loginActions.setUsername,
		[ILoginInputs.PASSWORD]: loginActions.setPassword,
	}), []);

	const handleChange = useCallback((fieldName: ILoginInputs, value: string) => {
		dispatch(actions[fieldName](value));
	}, [actions, dispatch]);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const result = await dispatch(loginByUsername({ username, password }));

			if (loginByUsername.fulfilled.match(result)) {
				dispatch(loginActions.setUsername(''));
				dispatch(loginActions.setPassword(''));

				closeModal?.();
			}
		},
		[closeModal, dispatch, password, username]
	);

	return (
		<DynamicModuleLoader reducers={initialReducer}>
			<form
				className={classNames(cls.form, {}, [className])}
				onSubmit={(e) => handleSubmit(e)}
			>
				<Text title={tAuth('authorization form')}/>
				{inputs.map(({ name, placeholder, label }) => (
					<Input
						key={name}
						name={name}
						label={label}
						placeholder={placeholder}
						value={loginForm[name]}
						onChange={(value) => handleChange(name, value)}
					/>
				))}
				{error && <Text text={tErrors(error)} color={TextColor.RED_LIGHT} />}
				<Button
					theme={ButtonTheme.OUTLINE}
					className={'ml-a'}
					type={'submit'}
					disabled={isLoading}
				>
					{tAuth('login')}
				</Button>
				{isLoading && <Loader theme={LoaderTheme.OVERLAY} />}
			</form>
		</DynamicModuleLoader>
	);
};

export default LoginForm;