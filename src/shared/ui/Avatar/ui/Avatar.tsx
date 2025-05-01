import { memo, useMemo, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './Avatar.module.scss';
import DefaultAvatar from '@shared/assets/images/other/default-avatar.webp';

type AvatarProps = {
	className?: string;
	src?: string;
	alt?: string;
	borderRadius?: CSSProperties['borderRadius'];
	size?: CSSProperties['width' | 'height'];
};

const Avatar = memo((props: AvatarProps) => {
	const { className, src, alt = 'Image', size = 100, borderRadius = '50%' } = props;

	const styles: CSSProperties = useMemo(() => ({
		width: size,
		height: size,
		borderRadius,
	}), [borderRadius, size]);

	return (
		<div className={classNames(cls.avatar, {}, [className])} style={styles}>
			<picture>
				<img src={src ?? DefaultAvatar} alt={alt} />
			</picture>
		</div>
	);
});

export default Avatar;