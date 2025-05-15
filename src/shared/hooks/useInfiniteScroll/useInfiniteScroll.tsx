import { useEffect, useRef, type RefObject } from 'react';

interface UseInfiniteScrollProps {
	callback?: () => void;
	triggerRef: RefObject<HTMLElement | null>;
	wrapperRef: RefObject<HTMLElement | null>;
}

export const useInfiniteScroll = ({ callback, triggerRef, wrapperRef }: UseInfiniteScrollProps) => {
	const observerRef = useRef<IntersectionObserver>(null);

	useEffect(() => {
		const triggerEl = triggerRef.current;
		const wrapperEl = wrapperRef.current;
		const options: IntersectionObserverInit = {
			root: wrapperEl,
			rootMargin: '0px',
			threshold: 0,
		};

		if (!callback || !triggerEl || !wrapperEl) return;

		observerRef.current?.disconnect();

		observerRef.current = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				callback();
			}
		}, options);

		observerRef.current.observe(triggerEl);

		return () => observerRef.current?.disconnect();
	}, [callback, triggerRef, wrapperRef]);
};