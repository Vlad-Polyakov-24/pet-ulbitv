import { Currency } from '@entities/Currency';
import { Country } from '@entities/Country';

export enum ValidateProfileErrors {
	SERVER_ERROR = 'server_error',
	NO_DATA = 'no_profile_data',
	EMPTY_FIELD = 'empty_field',
	INVALID_FIELD = 'invalid_field',
	INVALID_AGE = 'invalid_age',
	INVALID_AVATAR = 'invalid_avatar',
}

export interface IProfile {
	id?: string;
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
	validateErrors?: ValidateProfileErrorsMap;
}

export type ValidateProfileErrorsMap = Partial<Record<keyof IProfile | 'global', ValidateProfileErrors[]>>;