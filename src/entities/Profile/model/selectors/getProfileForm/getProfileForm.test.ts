import { describe, test, expect } from 'vitest';
import { getProfileForm } from './getProfileForm';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { Country } from '@entities/Country';
import { Currency } from '@entities/Currency';

describe('getProfileForm', () => {
	test('should return profile form data', () => {
		const data = {
			username: 'admin',
			age: '29',
			country: Country.UKRAINE,
			lastname: 'poliakov',
			first: 'vlad',
			city: 'kharkiv',
			currency: Currency.USD,
		};

		const state: Partial<StoreProviderSchema> = {
			profile: {
				form: data,
				isLoading: false,
				readonly: true,
			},
		};

		expect(getProfileForm(state as StoreProviderSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getProfileForm(state as StoreProviderSchema)).toEqual(undefined);
	});
});
