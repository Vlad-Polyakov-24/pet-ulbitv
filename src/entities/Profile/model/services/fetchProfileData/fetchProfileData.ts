import { createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { IProfile } from '../../types/Profile.types';

export const fetchProfileData = createAsyncThunk<IProfile, string, ThunkConfig<string>>(
	'profile/fetchProfileData',
	async (profileId, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI;

		try {
			const response = await extra.api.get<IProfile>(`${endpoints.PROFILE}/${profileId}`);

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.error(e);
			return rejectWithValue('fetch profile failed');
		}
	},
);