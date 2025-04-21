import { createSlice } from '@reduxjs/toolkit';
import type { IProfileSchema } from '../types/Profile.types';

const initialState: IProfileSchema = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {

	},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;