import { describe, test, expect } from 'vitest';
import { getArticleError, getArticleIsLoading, getArticleData } from './articleSelectors';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import { ArticleBlockType, ArticleType, type IArticleBlockText } from '../types/Article.types';

describe('articleSelectors', () => {
	test('should return data', () => {
		const data = {
			id: '1',
			title: 'Javascript news',
			subtitle: 'What\'s new in JS in 2025?',
			img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
			views: 1022,
			createdAt: '26.02.2022',
			type: [ArticleType.IT],
			blocks: [
				{
					id: '1',
					type: ArticleBlockType.TEXT,
					title: 'Title of this block',
					paragraphs: [
						'The program that is traditionally called "Hello, world!" is very simple. It outputs the phrase "Hello, world!" or something similar somewhere, using some language.',
						'JavaScript is a language that can be run in different environments. In our case, we are talking about browsers and the Node.js server platform. If you haven’t written a single line of JS code yet and you are reading this text in a browser, on a desktop computer, it means that you are literally seconds away from your first JavaScript program.',
					]
				} as IArticleBlockText,
			]
		};

		const state: Partial<StoreProviderSchema> = {
			article: {
				data,
				isLoading: false,
			},
		};

		expect(getArticleData(state as StoreProviderSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getArticleData(state as StoreProviderSchema)).toEqual(undefined);
	});

	test('should return isLoading', () => {
		const data = {
			id: '1',
			title: 'Javascript news',
			subtitle: 'What\'s new in JS in 2025?',
			img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
			views: 1022,
			createdAt: '26.02.2022',
			type: [ArticleType.IT],
			blocks: [
				{
					id: '1',
					type: ArticleBlockType.TEXT,
					title: 'Title of this block',
					paragraphs: [
						'The program that is traditionally called "Hello, world!" is very simple. It outputs the phrase "Hello, world!" or something similar somewhere, using some language.',
						'JavaScript is a language that can be run in different environments. In our case, we are talking about browsers and the Node.js server platform. If you haven’t written a single line of JS code yet and you are reading this text in a browser, on a desktop computer, it means that you are literally seconds away from your first JavaScript program.',
					]
				} as IArticleBlockText,
			]
		};

		const state: Partial<StoreProviderSchema> = {
			article: {
				data,
				isLoading: true,
			},
		};

		expect(getArticleIsLoading(state as StoreProviderSchema)).toEqual(true);
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getArticleIsLoading(state as StoreProviderSchema)).toEqual(undefined);
	});

	test('should return error', () => {
		const data = {
			id: '1',
			title: 'Javascript news',
			subtitle: 'What\'s new in JS in 2025?',
			img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
			views: 1022,
			createdAt: '26.02.2022',
			type: [ArticleType.IT],
			blocks: [
				{
					id: '1',
					type: ArticleBlockType.TEXT,
					title: 'Title of this block',
					paragraphs: [
						'The program that is traditionally called "Hello, world!" is very simple. It outputs the phrase "Hello, world!" or something similar somewhere, using some language.',
						'JavaScript is a language that can be run in different environments. In our case, we are talking about browsers and the Node.js server platform. If you haven’t written a single line of JS code yet and you are reading this text in a browser, on a desktop computer, it means that you are literally seconds away from your first JavaScript program.',
					]
				} as IArticleBlockText,
			]
		};

		const state: Partial<StoreProviderSchema> = {
			article: {
				data,
				isLoading: true,
				error: 'error',
			},
		};

		expect(getArticleError(state as StoreProviderSchema)).toEqual('error');
	});
	test('should work with empty state', () => {
		const state: Partial<StoreProviderSchema> = {};
		expect(getArticleError(state as StoreProviderSchema)).toEqual(undefined);
	});
});
