import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Button } from '@shared/ui/Button';
import cls from './ErrorPage.module.scss';

interface ErrorPageProps {
	className?: string;
}

const ErrorPage = ({ className }: ErrorPageProps) => {
	const { t } = useTranslation();

	const reloadPage = () => {
		location.reload();
	};

	return (
		<div className={classNames(cls.errorPage, {}, [className])}>
			<p>{t('an unexpected error has occurred')}</p>
			<Button onClick={reloadPage}>
				{t('reload page')}
			</Button>
		</div>
	);
};

export default ErrorPage;
