import { describe, test, expect } from 'vitest';
import { getProfileIsLoading } from './getProfileIsLoading';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';

describe('getProfileIsLoading', () => {
	test('should return isLoading', () => {
		const state: Partial<StoreProviderSchema> = {
			profile: {
				isLoading: true,
				readonly: true,
			},
		};
		expect(getProfileIsLoading(state as StoreProviderSchema)).toEqual(true);
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getProfileIsLoading(state as StoreProviderSchema)).toEqual(undefined);
	});
});
