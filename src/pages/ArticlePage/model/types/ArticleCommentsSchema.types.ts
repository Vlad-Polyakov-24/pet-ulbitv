import type { EntityState } from '@reduxjs/toolkit';
import type { IComment } from '@entities/Comment';

export interface IArticleCommentsSchema extends EntityState<IComment, string>{
	isLoading?: boolean;
	error?: string;
}