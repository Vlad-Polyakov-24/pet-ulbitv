import axios from 'axios';
import { getStorage } from '@shared/lib/localStorage';
import { endpoints } from '@shared/const/endpoints';
import { localStorageKeys } from '@shared/const/localStorage';

export const $api = axios.create({
	baseURL: endpoints.BASE,
	headers: {
		authorization: getStorage(localStorageKeys.AUTH_DATA),
	},
});