import type { CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import { DefaultLoader } from '../DefaultLoader/DefaultLoader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
	className?: string;
	styles?: CSSProperties;
}

const PageLoader = ({ className, styles }: PageLoaderProps) => (
	<div className={classNames(cls.page, {}, [className])} style={styles}>
		<DefaultLoader />
	</div>
);

export { PageLoader };
