import { describe, test, expect } from 'vitest';
import { profileActions, profileReducer } from '../slice/profileSlice';
import { Country } from '@entities/Country';
import { Currency } from '@entities/Currency';
import { IProfileSchema, ValidateProfileErrors } from '../types/Profile.types';
import { updateProfileData } from '@entities/Profile';

const data = {
	username: 'admin',
	age: '29',
	country: Country.UKRAINE,
	lastname: 'poliakov',
	firstname: 'vlad',
	city: 'kharkiv',
	currency: Currency.USD,
};

describe('profileSlice', () => {
	test('test set readonly', () => {
		const state: Partial<IProfileSchema> = { readonly: false };

		expect(profileReducer(
			state as IProfileSchema,
			profileActions.setReadonly(true),
		)).toEqual({ readonly: true });
	});

	test('test cancel edit', () => {
		const state: Partial<IProfileSchema> = { data, form: { firstname: '' } };

		expect(profileReducer(
			state as IProfileSchema,
			profileActions.cancelEdit(),
		)).toEqual({ data, form: data });
	});

	test('update profile', () => {
		const state: Partial<IProfileSchema> = { form: { firstname: 'vlad' } };

		expect(profileReducer(
			state as IProfileSchema,
			profileActions.setProfileData({ firstname: 'vlados' }),
		)).toEqual({ form: { firstname: 'vlados' } });
	});

	test('update profile service pending', () => {
		const state: Partial<IProfileSchema> = { isLoading: false, validateErrors: { global: [ValidateProfileErrors.SERVER_ERROR] } };

		expect(profileReducer(
			state as IProfileSchema,
			updateProfileData.pending('', undefined),
		)).toEqual({ isLoading: true, validateErrors: undefined });
	});

	test('update profile service fulfilled', () => {
		const state: Partial<IProfileSchema> = { isLoading: true };

		expect(profileReducer(
			state as IProfileSchema,
			updateProfileData.fulfilled(data, '', ''),
		)).toEqual({ isLoading: false, validateErrors: undefined, form: data, data });
	});
});