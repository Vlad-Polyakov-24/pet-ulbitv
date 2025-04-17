import { setStorage, getStorage, removeStorage } from '@shared/lib/localStorage';

export const useLocalStorage = () => ({ setStorage, getStorage, removeStorage });