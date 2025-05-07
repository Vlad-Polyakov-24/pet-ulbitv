import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IScrollRestorationSchema } from '../types/ScrollRestorationSchema';

const initialState: IScrollRestorationSchema = {
	scroll: {},
};

const scrollRestorationSlice = createSlice({
	name: 'scrollRestoration',
	initialState,
	reducers: {
		setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) =>  {
			state.scroll[payload.path] = payload.position;
		},
	},
});

export const { actions: scrollRestorationActions } = scrollRestorationSlice;
export const { reducer: scrollRestorationReducer } = scrollRestorationSlice;