export { userActions, userReducer } from './model/slice/userSlice';

export { getAuthData } from './model/selectors/getAuthData/getAuthData';
export { getUserIsMounted } from './model/selectors/getUserIsMounted/getUserIsMounted';

export type { IUser, IUserSchema } from './model/types/User.types';