import { describe, test, expect } from 'vitest';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { ValidateProfileErrors } from '../../types/Profile.types';

describe('getProfileValidateErrors', () => {
	test('should return validate errors', () => {
		const validateErrors = {
			firstname: [ValidateProfileErrors.INVALID_FIELD],
			lastname: [ValidateProfileErrors.INVALID_FIELD],
			age: [ValidateProfileErrors.INVALID_AGE],
		};

		const state: Partial<StoreProviderSchema> = {
			profile: {
				isLoading: false,
				readonly: true,
				validateErrors,
			},
		};
		expect(getProfileValidateErrors(state as StoreProviderSchema)).toEqual(validateErrors);
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getProfileValidateErrors(state as StoreProviderSchema)).toEqual(undefined);
	});
});
