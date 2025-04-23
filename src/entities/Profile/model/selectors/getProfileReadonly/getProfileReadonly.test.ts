import { describe, test, expect } from 'vitest';
import { getProfileReadonly } from './getProfileReadonly';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';

describe('getProfileReadonly', () => {
	test('should return readonly', () => {
		const state: Partial<StoreProviderSchema> = {
			profile: {
				isLoading: false,
				readonly: true,
			},
		};
		expect(getProfileReadonly(state as StoreProviderSchema)).toEqual(true);
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getProfileReadonly(state as StoreProviderSchema)).toEqual(undefined);
	});
});
