import type { NavigateOptions, To } from 'react-router';
import type { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { vi, type MockedFunction } from 'vitest';
import type { StoreProviderSchema, ThunkConfig } from '@app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectValue> =
	undefined extends Arg
		? (arg?: Arg) => AsyncThunkAction<Return, Arg, ThunkConfig<RejectValue>>
		: (arg: Arg) => AsyncThunkAction<Return, Arg, ThunkConfig<RejectValue>>;

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectValue> {
	dispatch: Dispatch;
	getState: () => StoreProviderSchema;
	actionCreator: ActionCreatorType<Return, Arg, RejectValue>;
	api: typeof mockedAxios;
	navigate: MockedFunction<(to: To, options?: NavigateOptions) => void>;

	constructor(actionCreator: ActionCreatorType<Return, Arg, RejectValue>, state?: Partial<StoreProviderSchema>) {
		this.actionCreator = actionCreator;
		this.dispatch = vi.fn();
		this.getState = vi.fn(() => state as StoreProviderSchema);
		this.api = mockedAxios;
		this.navigate = vi.fn();
	};

	async callThunk(arg?: Arg) {
		const action = this.actionCreator(arg as Arg);
		return action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });
	};
}