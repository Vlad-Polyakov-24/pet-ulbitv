import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getStorage, removeStorage } from '@shared/lib/localStorage';
import { localStorageKeys } from '@shared/const/localStorage';
import type { IUser, IUserSchema } from '../types/User.types';

const initialState: IUserSchema = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<IUser>) => {
			state.authData = action.payload;
		},
		initAuthData: (state) => {
			const user = getStorage(localStorageKeys.AUTH_DATA);

			if (user) {
				state.authData = JSON.parse(user);
			}
		},
		logout: (state) => {
			state.authData = undefined;
			removeStorage(localStorageKeys.AUTH_DATA);
		},
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;