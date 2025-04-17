import type { TFunction } from 'i18next';
import { ILoginInputs } from '../types/LoginForm.types';

export const getLoginInputs = (t: TFunction) => [
	{
		name: ILoginInputs.USERNAME,
		placeholder: t(ILoginInputs.USERNAME),
		label: t(ILoginInputs.USERNAME),
	},
	{
		name: ILoginInputs.PASSWORD,
		placeholder: t(ILoginInputs.PASSWORD),
		label: t(ILoginInputs.PASSWORD),
	},
];