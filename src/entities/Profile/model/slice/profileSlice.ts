import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import type { IProfile, IProfileSchema } from '../types/Profile.types';

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
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		cancelEdit: (state) => {
			state.form = state.data;
			state.validateErrors = undefined;
		},
		setProfileData: (state, action: PayloadAction<IProfile>) => {
			state.form = {
				...state.form,
				...action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfileData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
				state.isLoading = false;
				state.data = action.payload;
				state.form = action.payload;
			})
			.addCase(fetchProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateProfileData.pending, (state) => {
				state.validateErrors  = undefined;
				state.isLoading = true;
			})
			.addCase(updateProfileData.fulfilled, (state, action: PayloadAction<IProfile>) => {
				state.isLoading = false;
				state.data = action.payload;
				state.form = action.payload;
				state.validateErrors = undefined;
			})
			.addCase(updateProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.validateErrors = action.payload;
			});
	},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;