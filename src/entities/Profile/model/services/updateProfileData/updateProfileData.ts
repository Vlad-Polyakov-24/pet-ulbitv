import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import type { IProfile } from '../../types/Profile.types';

export const updateProfileData = createAsyncThunk<IProfile, void, ThunkConfig<string>>(
	'profile/updateProfileData',
	async (_, thunkAPI) => {
		const { rejectWithValue, extra, getState } = thunkAPI;
		const formData = getProfileForm(getState());

		try {
			const response = await extra.api.put<IProfile>(endpoints.PROFILE, formData);

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