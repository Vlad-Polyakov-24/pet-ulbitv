import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../model/types/StoreProvider.types';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();