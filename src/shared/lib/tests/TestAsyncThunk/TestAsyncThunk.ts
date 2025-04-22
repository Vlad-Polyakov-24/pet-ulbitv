import type { NavigateOptions, To } from 'react-router';
import type { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { vi, type MockedFunction } from 'vitest';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: Dispatch;
	getState: () => StoreProviderSchema;
	actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;
	api: typeof mockedAxios;
	navigate: MockedFunction<(to: To, options?: NavigateOptions) => void>;

	constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
		this.actionCreator = actionCreator;
		this.dispatch = vi.fn();
		this.getState = vi.fn();
		this.api = mockedAxios;
		this.navigate = vi.fn();
	};

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg);
		return action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });
	};
}