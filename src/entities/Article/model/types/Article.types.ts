export enum ArticleType {
	IT = 'it',
	SCIENCE = 'science',
	ECONOMICS = 'economics',
}

export enum ArticleBlockType {
	CODE = 'code',
	TEXT = 'text',
	IMAGE = 'image',
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
	title: string;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	type: ArticleType[];
	blocks: IArticleBlock[];
}