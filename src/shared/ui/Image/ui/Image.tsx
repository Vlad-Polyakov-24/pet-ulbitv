import { memo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './Image.module.scss';

type ImageProps = {
	className?: string;
	src: string;
	alt?: string;
	width?: CSSProperties['width'];
	height?: CSSProperties['height'];
	objectFit?: CSSProperties['objectFit'];
	styles?: CSSProperties;
};

const Image = memo((props: ImageProps) => {
	const { className, src, alt = 'image', width = '100%', height, objectFit = 'cover', styles } = props;

	const style: CSSProperties = {
		width,
		height,
		...styles
	};

	return (
		<div className={classNames(cls.img, {}, [className])} style={style}>
			<picture>
				<img src={src} alt={alt} style={{ objectFit }} />
			</picture>
		</div>
	);
});

export default Image;