import type { IProfile } from '../types/Profile.types';

interface IInputs {
	column: { name: keyof IProfile}[];
	row: { name: keyof IProfile}[];
}

export const inputs: IInputs = {
	column: [
		{
			name: 'firstname',
		},
		{
			name: 'lastname',
		},
		{
			name: 'username',
		},
		{
			name: 'age',
		},
		{
			name: 'city',
		},
		{
			name: 'avatar',
		},
	],
	row: [
		{
			name: 'country',
		},
		{
			name: 'currency',
		},
	]
};