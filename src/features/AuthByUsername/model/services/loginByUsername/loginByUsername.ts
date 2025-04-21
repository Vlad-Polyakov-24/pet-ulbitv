import { createAsyncThunk } from '@reduxjs/toolkit';
import { setStorage } from '@shared/lib/localStorage';
import { userActions, type IUser } from '@entities/User';
import { endpoints } from '@shared/const/endpoints';
import { localStorageKeys } from '@shared/const/localStorage';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { ILoginSchema } from '../../types/LoginSchema.types';

type ILoginByUsernameProps = Omit<ILoginSchema, 'error' | 'isLoading'>;

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps, ThunkConfig<string>>(
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		const { dispatch, rejectWithValue, extra } = thunkAPI;

		try {
			const response = await extra.api.post<IUser>(endpoints.LOGIN, authData);

			if (!response.data) {
				throw new Error();
			}

			setStorage(localStorageKeys.AUTH_DATA, JSON.stringify(response.data));
			dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (e) {
			console.error(e);
			return rejectWithValue('invalid credentials');
		}
 	},
);