import { useCallback, useRef } from 'react';

export const useDebounce = <Args extends unknown[]>(
	callback: (...args: Args) => void,
	delay: number,
): ((...args: Args) => void) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	return useCallback((...args: Args) => {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			callback(...args);
		}, delay);
	}, [callback, delay]);
};