import { describe, test, expect } from 'vitest';
import { articleReducer } from './ArticleSlice.ts';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import type { IArticleSchema } from '../types/ArticleSchema.types';
import { ArticleBlockType, ArticleType, type IArticleBlockText } from '../types/Article.types';

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

describe('articleSlice', () => {
	test('fetch article pending', () => {
		const state: Partial<IArticleSchema> = { isLoading: false };

		expect(articleReducer(
			state as IArticleSchema,
			fetchArticleById.pending('', ''),
		)).toEqual({ isLoading: true });
	});

	test('fetch article fulfilled', () => {
		const state: Partial<IArticleSchema> = { isLoading: true };

		expect(articleReducer(
			state as IArticleSchema,
			fetchArticleById.fulfilled(data, '', ''),
		)).toEqual({ isLoading: false, data });
	});
});