import { describe, test, expect } from 'vitest';
import { TestAsyncThunk } from '@shared/lib/tests/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { Country } from '@entities/Country';
import { Currency } from '@entities/Currency';

const data = {
	username: 'admin',
	age: '29',
	country: Country.UKRAINE,
	lastname: 'poliakov',
	first: 'vlad',
	city: 'kharkiv',
	currency: Currency.USD,
};

describe('fetchProfileData', () => {
	test('succeed fetch data', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ data }));
		const result = await thunk.callThunk();

		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('failed fetch data', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
	});
});