import { localStorageKeys } from '@shared/const/localStorage';

export const setStorage = (key: localStorageKeys, value: string) => localStorage.setItem(key, value);

export const getStorage = (value: localStorageKeys) => localStorage.getItem(value);

export const removeStorage = (value: localStorageKeys) => localStorage.removeItem(value);