export interface IUser {
	id: number;
	username: string;
}

export interface IUserSchema {
	 authData?: IUser;
}