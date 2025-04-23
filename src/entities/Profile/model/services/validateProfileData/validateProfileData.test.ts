import { describe, test, expect } from 'vitest';
import { validateProfileData } from './validateProfileData';
import { Country } from '@entities/Country';
import { Currency } from '@entities/Currency';
import { ValidateProfileErrors } from '../../types/Profile.types';

const data = {
	firstname: 'vlad',
	lastname: 'poliakov',
	username: 'admin',
	age: '29',
	city: 'kharkiv',
	avatar: 'https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/38a0c760-a29a-47e4-82e8-e9aa6359d200/avatarhd',
	currency: Currency.USD,
	country: Country.UKRAINE,
};

describe('validateProfileData', () => {
	test('succeed validate data', async () => {
		const result = validateProfileData(data);

		expect(result).toEqual({});
	});

	test('without first and last name', async () => {
		const result = validateProfileData({ ...data, firstname: '', lastname: '' });

		expect(result).toEqual({
			firstname: [ValidateProfileErrors.EMPTY_FIELD],
			lastname: [ValidateProfileErrors.EMPTY_FIELD],
		});
	});

	test('incorrect age', async () => {
		const result = validateProfileData({ ...data, age: '299' });

		expect(result).toEqual({
			age: [ValidateProfileErrors.INVALID_AGE],
		});
	});

	test('incorrect avatar', async () => {
		const result = validateProfileData({ ...data, avatar: 'avatar' });

		expect(result).toEqual({
			avatar: [ValidateProfileErrors.INVALID_AVATAR],
		});
	});

	test('incorrect all', async () => {
		const result = validateProfileData({});

		expect(result).toEqual({
			firstname: [ValidateProfileErrors.EMPTY_FIELD],
			lastname: [ValidateProfileErrors.EMPTY_FIELD],
			currency: [ValidateProfileErrors.EMPTY_FIELD],
			country: [ValidateProfileErrors.EMPTY_FIELD],
			age: [ValidateProfileErrors.EMPTY_FIELD, ValidateProfileErrors.INVALID_AGE],
		});
	});
});