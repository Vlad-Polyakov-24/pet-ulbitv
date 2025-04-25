import { memo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './Skeleton.module.scss';

type SkeletonProps = {
	className?: string;
	styles?: {
		width?: CSSProperties['width'];
		height?: CSSProperties['height'];
		borderRadius?: CSSProperties['borderRadius'];
	};
	globalStyle?: CSSProperties;
};

const Skeleton = memo((props: SkeletonProps) => {
	const { className, styles, globalStyle } = props;
	const style: CSSProperties = { ...styles, ...globalStyle };

	return <span className={classNames(cls.skeleton, {}, [className])} style={style} />;
});

export default Skeleton;