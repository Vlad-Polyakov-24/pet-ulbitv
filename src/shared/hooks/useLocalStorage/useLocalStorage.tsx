import { localStorageKeys } from '@shared/config/localStorage/localStorage';

export const useLocalStorage = () => {

	const setStorage = (key: localStorageKeys, value: string) => localStorage.setItem(key, value);

	const getStorage = (value: localStorageKeys) => localStorage.getItem(value);

	const removeStorage = (value: localStorageKeys) => localStorage.removeItem(value);

	return { setStorage, getStorage, removeStorage };
};