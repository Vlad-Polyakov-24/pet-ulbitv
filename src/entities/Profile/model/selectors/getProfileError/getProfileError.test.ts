import { describe, test, expect } from 'vitest';
import { getProfileError } from './getProfileError';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';

describe('getProfileError', () => {
	test('should return error', () => {
		const state: Partial<StoreProviderSchema> = {
			profile: {
				isLoading: false,
				readonly: true,
				error: 'error',
			},
		};
		expect(getProfileError(state as StoreProviderSchema)).toEqual('error');
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getProfileError(state as StoreProviderSchema)).toEqual(undefined);
	});
});
