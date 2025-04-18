import { createSelector } from '@reduxjs/toolkit';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';
import type { ILoginSchema } from '../../types/LoginSchema.types';

const initialLoginState: ILoginSchema = {
	username: '',
	password: '',
	isLoading: false,
};

export const getLoginState = createSelector(
	[(state: StoreProviderSchema) => state.login],
	(login) => login ?? initialLoginState,
);