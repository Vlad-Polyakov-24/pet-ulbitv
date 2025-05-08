import type { IUser } from '@entities/User';

export enum ArticleType {
	ALL = 'ALL',
	IT = 'IT',
	SCIENCE = 'SCIENCE',
	ECONOMICS = 'ECONOMICS',
}

export enum ArticleBlockType {
	CODE = 'CODE',
	TEXT = 'TEXT',
	IMAGE = 'IMAGE',
}

export enum ArticleView {
	GRID = 'grid',
	SINGLE = 'single',
}

interface IArticleBlockBase {
	id: string;
	type: ArticleBlockType;
}

export interface IArticleBlockCode extends IArticleBlockBase {
	type: ArticleBlockType.CODE;
	code: string;
}

export interface IArticleBlockText extends IArticleBlockBase {
	type: ArticleBlockType.TEXT;
	title?: string;
	paragraphs: string[];
}

export interface IArticleBlockImage extends IArticleBlockBase {
	type: ArticleBlockType.IMAGE;
	src: string;
	title: string;
}

interface ArticleBlockTypeMap {
	[ArticleBlockType.CODE]: IArticleBlockCode;
	[ArticleBlockType.TEXT]: IArticleBlockText;
	[ArticleBlockType.IMAGE]: IArticleBlockImage;
}

export type IArticleBlock = ArticleBlockTypeMap[keyof ArticleBlockTypeMap];

export interface IArticle {
	id: string;
	user: IUser;
	title: string;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	type: ArticleType[];
	blocks: IArticleBlock[];
}