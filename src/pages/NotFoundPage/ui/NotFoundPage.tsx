import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
	className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
	const { t } = useTranslation('errors');

	return (
		<section className={classNames(cls.notFound, {}, [className])}>
			<Container fluid>
				{t('page not found')}
			</Container>
		</section>
	);
};

export default NotFoundPage;