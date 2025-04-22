import { describe, test, expect } from 'vitest';
import { TestAsyncThunk } from '@shared/lib/tests/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';
import { userActions } from '@entities/User';

describe('loginByUsername', () => {
	test('succeed auth', async () => {
		const userValue = { username: 'username', id: '1' };
		const thunk = new TestAsyncThunk(loginByUsername);
		thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
		const result = await thunk.callThunk({ username: 'username', password: 'password' });

		expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(thunk.api.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(userValue);
	});

	test('failed auth', async () => {
		const thunk = new TestAsyncThunk(loginByUsername);
		thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk({ username: 'username', password: 'password' });

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe('invalid credentials');
	});
});