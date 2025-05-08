import { describe, expect, test } from 'vitest';
import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
	test('with one params', () => {
		const params = getQueryParams({ test: 'value' });

		expect(params).toBe('?test=value');
	});

	test('with multiple params', () => {
		const params = getQueryParams({
			test: 'value',
			second: 'second',
			third: 'third',
		});

		expect(params).toBe('?test=value&second=second&third=third');
	});

	test('with empty string', () => {
		const params = getQueryParams({
			test: 'value',
			second: '',
		});

		expect(params).toBe('?test=value');
	});
});