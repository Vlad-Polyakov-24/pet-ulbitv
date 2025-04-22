import { Currency } from '@entities/Currency';
import { Country } from '@entities/Country';

export interface IProfile {
	firstname?: string;
	lastname?: string;
	age?: string;
	currency?: Currency;
	country?: Country;
	city?: string;
	username?: string;
	avatar?: string;
}

export interface IProfileSchema {
	data?: IProfile;
	form?: IProfile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
}