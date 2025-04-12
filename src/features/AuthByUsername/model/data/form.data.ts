import type { TFunction } from 'i18next';

export const getLoginInputs = (t: TFunction) => [
	{
		name: 'username',
		placeholder: t('username'),
		label: t('username'),
	},
	{
		name: 'password',
		placeholder: t('password'),
		label: t('password'),
	},
];