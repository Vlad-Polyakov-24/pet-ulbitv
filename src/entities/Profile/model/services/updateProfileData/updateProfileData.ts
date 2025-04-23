import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { endpoints } from '@shared/const/endpoints';
import type { ThunkConfig } from '@app/providers/StoreProvider';
import { type IProfile, ValidateProfileErrors, ValidateProfileErrorsMap } from '../../types/Profile.types';

export const updateProfileData = createAsyncThunk<IProfile, unknown, ThunkConfig<ValidateProfileErrorsMap>>(
	'profile/updateProfileData',
	async (_, thunkAPI) => {
		const { rejectWithValue, extra, getState } = thunkAPI;
		const formData = getProfileForm(getState());
		const errors = validateProfileData(formData);

		if (Object.keys(errors).length > 0) {
			return rejectWithValue(errors);
		}

		try {
			const response = await extra.api.put<IProfile>(endpoints.PROFILE, formData);

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.error(e);
			return rejectWithValue({ global: [ValidateProfileErrors.SERVER_ERROR] });
		}
	},
);