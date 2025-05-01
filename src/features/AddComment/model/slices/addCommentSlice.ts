import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAddCommentSchema } from '../types/AddCommentSchema';

const initialState: IAddCommentSchema = {
	comment: '',
	error: undefined,
};

const addCommentSlice = createSlice({
	name: 'addComment',
	initialState,
	reducers: {
		setComment: (state, action: PayloadAction<string>) => {
			state.comment = action.payload;
		},
	},
});

export const { actions: addCommentActions } = addCommentSlice;
export const { reducer: addCommentReducer } = addCommentSlice;