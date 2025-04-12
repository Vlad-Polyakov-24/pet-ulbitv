import { createSlice } from '@reduxjs/toolkit';
import type  { IUserSchema } from '../types/User.types';

const initialState: IUserSchema = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;