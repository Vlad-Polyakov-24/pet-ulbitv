import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Button } from '@shared/ui/Button';
import { VStack } from '@shared/ui/Stack';
import cls from './ErrorPage.module.scss';

interface ErrorPageProps {
	className?: string;
}

const ErrorPage = ({ className }: ErrorPageProps) => {
	const { t } = useTranslation('errors');

	const reloadPage = () => {
		location.reload();
	};

	return (
		<VStack
			className={classNames(cls.errorPage, {}, [className])}
			align={'center'}
			justify={'center'}
		>
			<p>{t('an unexpected error has occurred')}</p>
			<Button onClick={reloadPage}>
				{t('reload page')}
			</Button>
		</VStack>
	);
};

export default ErrorPage;
