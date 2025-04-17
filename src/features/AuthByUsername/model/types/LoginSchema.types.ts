import { ILoginInputs } from './LoginForm.types';

export interface ILoginSchema {
	[ILoginInputs.USERNAME]: string;
	[ILoginInputs.PASSWORD]: string;
	isLoading: boolean;
	error?: string;
}