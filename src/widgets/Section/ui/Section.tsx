import { useRef, useEffect, type ReactNode, type UIEvent, type RefObject } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { classNames } from '@shared/lib/classNames';
import { useThrottle } from '@shared/hooks/useThrottle';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import { useAppDispatch, type StoreProviderSchema } from '@app/providers/StoreProvider';
import { getScrollRestorationScrollByPath, scrollRestorationActions } from '@features/ScrollRestoration';
import cls from './Section.module.scss';

type SectionProps = {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
	restoreScroll?: boolean;
	wrapperRef?: RefObject<HTMLDivElement | null>;
};

const Section = (props: SectionProps) => {
	const { className, children, onScrollEnd, restoreScroll = false, wrapperRef: externalWrapperRef } = props;
	const { pathname } = useLocation();
	const internalWrapperRef = useRef<HTMLDivElement>(null);
	const wrapperRef = externalWrapperRef ?? internalWrapperRef;
	const triggerRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const scrollPosition = useSelector(
		(state: StoreProviderSchema) => getScrollRestorationScrollByPath(state, pathname)
	);

	useInfiniteScroll({
		wrapperRef,
		triggerRef,
		callback: onScrollEnd,
	});

	useEffect(() => {
		if (restoreScroll && wrapperRef.current) {
			wrapperRef.current.scrollTop = scrollPosition;
		}
	}, [restoreScroll, scrollPosition, wrapperRef]);

	const handleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(scrollRestorationActions.setScrollPosition({
			position: e.currentTarget.scrollTop,
			path: pathname,
		}));
	}, 1000);

	return (
		<section ref={wrapperRef} onScroll={handleScroll} className={classNames(cls.section, {}, [className])}>
			{children}
			{onScrollEnd && <div className={cls.section__trigger} ref={triggerRef} />}
		</section>
	);
};

export default Section;