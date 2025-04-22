import type { ISelectOptions } from '@shared/ui/Select';
import { Currency } from '../types/Currency.types';

export const currencySelectOptions: ISelectOptions[] = [
	{
		value: Currency.UAH,
		label: Currency.UAH,
	},
	{
		value: Currency.USD,
		label: Currency.USD,
	},
	{
		value: Currency.EUR,
		label: Currency.EUR,
	},
];