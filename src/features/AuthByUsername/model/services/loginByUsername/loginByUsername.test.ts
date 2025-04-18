import { describe, test, vi, expect } from 'vitest';
import axios from 'axios';
import { TestAsyncThunk } from '@shared/lib/tests/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';
import { userActions } from '@entities/User';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('loginByUsername', () => {

	test('succeed auth', async () => {
		const userValue = { username: 'username', id: '1' };
		mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
		const thunk = new TestAsyncThunk(loginByUsername);
		const result = await thunk.callThunk({ username: 'username', password: 'password' });

		expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(userValue);
	});

	test('failed auth', async () => {
		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
		const thunk = new TestAsyncThunk(loginByUsername);
		const result = await thunk.callThunk({ username: 'username', password: 'password' });

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe('invalid credentials');
	});
});