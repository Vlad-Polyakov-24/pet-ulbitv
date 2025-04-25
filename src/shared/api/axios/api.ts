import axios from 'axios';
import { getStorage } from '@shared/lib/localStorage';
import { endpoints } from '@shared/const/endpoints';
import { localStorageKeys } from '@shared/const/localStorage';

export const $api = axios.create({
	baseURL: endpoints.BASE,
});

$api.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.Authorization = getStorage(localStorageKeys.AUTH_DATA) || '';
	}
	return config;
});
