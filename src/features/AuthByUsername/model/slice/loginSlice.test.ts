import { describe, test, expect } from 'vitest';
import { loginActions, loginReducer } from '../slice/loginSlice';
import { ILoginInputs } from '../types/LoginForm.types';
import type { ILoginSchema } from '../types/LoginSchema.types';

describe('loginSlice', () => {
	test('test set username', () => {
		const state: Partial<ILoginSchema> = { [ILoginInputs.USERNAME]: 'username' };

		expect(loginReducer(
			state as ILoginSchema,
			loginActions.setUsername('username'),
		)).toEqual({ username: 'username' });
	});

	test('test set password', () => {
		const state: Partial<ILoginSchema> = { [ILoginInputs.PASSWORD]: 'password' };

		expect(loginReducer(
			state as ILoginSchema,
			loginActions.setPassword('password'),
		)).toEqual({ password: 'password' });
	});
});