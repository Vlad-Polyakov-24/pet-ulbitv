import type { IArticleCommentsSchema } from './ArticleCommentsSchema.types';
import type { IArticleRecommendationsSchema } from './ArticleRecommendationsSchema.types';

export interface IArticlePageSchema {
	comments: IArticleCommentsSchema;
	recommendations: IArticleRecommendationsSchema
}