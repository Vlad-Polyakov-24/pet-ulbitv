import { describe, test, expect } from 'vitest';
import { TestAsyncThunk } from '@shared/lib/tests/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';
import { Country } from '@entities/Country';
import { Currency } from '@entities/Currency';
import { ValidateProfileErrors } from '@entities/Profile';

const data = {
	username: 'admin',
	age: '29',
	country: Country.UKRAINE,
	lastname: 'poliakov',
	firstname: 'vlad',
	city: 'kharkiv',
	currency: Currency.USD,
};

describe('updateProfileData', () => {
	test('succeed', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
				isLoading: false,
				readonly: true,
			}
		});
		thunk.api.put.mockReturnValue(Promise.resolve({ data }));
		const result = await thunk.callThunk();

		expect(thunk.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('server error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
				isLoading: false,
				readonly: true,
			}
		});
		thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual({ global: [ValidateProfileErrors.SERVER_ERROR] });
	});

	test('validate error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: { ...data, firstname: '' },
				isLoading: false,
				readonly: true,
			}
		});
		thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual({ firstname: [ValidateProfileErrors.EMPTY_FIELD] });
	});
});