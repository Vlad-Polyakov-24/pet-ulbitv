import { describe, test, expect } from 'vitest';
import { getLoginState } from './getLoginState';
import { ILoginInputs } from '../../types/LoginForm.types';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';

const login = {
	[ILoginInputs.USERNAME]: 'username',
	[ILoginInputs.PASSWORD]: 'password',
	isLoading: false,
	error: 'error',
};

describe('getLoginState', () => {
	test('should return the login state', () => {
		const state: Partial<StoreProviderSchema> = { login };

		expect(getLoginState(state as StoreProviderSchema)).toEqual(login);
	});

	test('should return default value', () => {
		const state: Partial<StoreProviderSchema> = {};

		expect(getLoginState(state as StoreProviderSchema)).toEqual({ isLoading: false, username: '', password: '' });
	});
});