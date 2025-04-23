import { memo, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import cls from './ErrorMessage.module.scss';

type ErrorMessageProps = {
	className?: string;
	styles?: CSSProperties;
	message: string;
};

const ErrorMessage = memo(({ className, styles, message }: ErrorMessageProps) => {
	const { t } = useTranslation('errors');

	return (
		<span className={classNames(cls.message, {}, [className])} style={styles}>{t(message)}</span>
	);
});

export default ErrorMessage;