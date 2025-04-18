import { vi } from 'vitest';
import type { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import type { StoreProviderSchema } from '@app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: Dispatch;
	getState: () => StoreProviderSchema;
	actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

	constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
		this.actionCreator = actionCreator;
		this.dispatch = vi.fn();
		this.getState = vi.fn();
	};

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg);
		return action(this.dispatch, this.getState, undefined);
	};
}