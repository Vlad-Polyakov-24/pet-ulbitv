import type { CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import { DefaultLoader } from '../DefaultLoader/DefaultLoader';
import cls from './OverlayLoader.module.scss';

type OverlayLoaderProps = {
	className?: string;
	styles?: CSSProperties;
};

const OverlayLoader = ({ className, styles }: OverlayLoaderProps) => (
	<div className={classNames(cls.overlay, {}, [className])} style={styles}>
		<DefaultLoader />
	</div>
);

export { OverlayLoader };