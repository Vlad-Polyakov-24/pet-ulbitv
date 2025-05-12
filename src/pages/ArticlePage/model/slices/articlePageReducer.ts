import { combineReducers } from '@reduxjs/toolkit';
import { articleCommentsSliceReducer } from '../slices/articleCommentsSlice';
import { articleRecommendationsSliceReducer } from '../slices/articleRecommendationsSlice';

export const articlePageReducer = combineReducers({
	comments: articleCommentsSliceReducer,
	recommendations: articleRecommendationsSliceReducer,
});