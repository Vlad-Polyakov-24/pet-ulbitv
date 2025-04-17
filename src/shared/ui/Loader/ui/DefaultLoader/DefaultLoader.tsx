import type { CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './DefaultLoader.module.scss';

interface LoaderProps {
	className?: string;
	styles?: CSSProperties;
}

const DefaultLoader = ({ className, styles }: LoaderProps) => (
	<span className={classNames(cls.loader, {}, [className])} style={styles} />
);

export { DefaultLoader };