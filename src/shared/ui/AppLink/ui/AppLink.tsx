import { Link, type LinkProps } from 'react-router';
import { classNames } from '@shared/lib/classNames';
import { AppLinkTheme } from '../model/types/AppLink.types';
import cls from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
}

const AppLink = (props: AppLinkProps) => {
	const {
		to,
		className,
		children,
		theme = AppLinkTheme.PRIMARY,
		...otherProps
	} = props;

	return (
		<Link
			to={to}
			className={classNames(cls.appLink, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</Link>
	);
};

export default AppLink;
