import { useRef, type ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useInfiniteScroll } from '@shared/hooks/useInfiniteScroll';
import cls from './Section.module.scss';

type SectionProps = {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
};

const Section = ({ className, children, onScrollEnd }: SectionProps) => {
	const wrapperRef = useRef(null);
	const triggerRef = useRef(null);

	useInfiniteScroll({
		wrapperRef,
		triggerRef,
		callback: onScrollEnd,
	});

	return (
		<section ref={wrapperRef} className={classNames(cls.section, {}, [className])}>
			{children}
			<div className={cls.section__trigger} ref={triggerRef} />
		</section>
	);
};

export default Section;