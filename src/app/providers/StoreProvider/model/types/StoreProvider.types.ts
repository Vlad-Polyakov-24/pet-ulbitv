import type { IUserSchema } from '@entities/User';
import type { ILoginSchema } from '@features/AuthByUsername';

export interface StoreProviderSchema {
	user: IUserSchema;
	login: ILoginSchema;
}