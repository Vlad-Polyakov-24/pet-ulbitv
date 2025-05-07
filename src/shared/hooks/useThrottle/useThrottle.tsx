import { useCallback, useRef } from 'react';

export const useThrottle = <Args extends unknown[]>(
	callback: (...args: Args) => void,
	delay: number,
): ((...args: Args) => void) => {
	const throttleRef = useRef(false);

	return useCallback((...args: Args) => {
		if (!throttleRef.current) {
			callback(...args);
			throttleRef.current = true;

			setTimeout(() => {
				throttleRef.current = false;
			}, delay);
		}
	}, [callback, delay]);
};