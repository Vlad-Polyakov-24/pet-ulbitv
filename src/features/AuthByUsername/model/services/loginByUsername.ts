import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setStorage } from '@shared/lib/localStorage';
import { userActions, type IUser } from '@entities/User';
import { endpoints } from '@shared/const/endpoints';
import { localStorageKeys } from '@shared/const/localStorage';
import type { ILoginSchema } from '../types/LoginSchema.types';

type ILoginByUsernameProps = Omit<ILoginSchema, 'error' | 'isLoading'>;

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps>(
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		try {
			const response = await axios.post<IUser>(endpoints.LOGIN, authData);

			if (!response.data) {
				throw new Error();
			}

			setStorage(localStorageKeys.AUTH_DATA, JSON.stringify(response.data));
			thunkAPI.dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (e) {
			console.error(e);
			return thunkAPI.rejectWithValue('invalid credentials');
		}
 	},
);