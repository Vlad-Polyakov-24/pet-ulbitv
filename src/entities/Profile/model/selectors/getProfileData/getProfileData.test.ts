import { describe, test, expect } from 'vitest';
import { getProfileData } from './getProfileData';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { Country } from '@entities/Country';
import { Currency } from '@entities/Currency';

describe('getProfileData', () => {
	test('should return profile data', () => {
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
				data,
				isLoading: false,
				readonly: true,
			},
		};

		expect(getProfileData(state as StoreProviderSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getProfileData(state as StoreProviderSchema)).toEqual(undefined);
	});
});
