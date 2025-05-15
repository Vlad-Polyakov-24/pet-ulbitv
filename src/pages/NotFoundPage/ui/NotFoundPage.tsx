import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { Text, TextAlign } from '@shared/ui/Text';
import { VStack } from '@shared/ui/Stack';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
	className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
	const { t } = useTranslation('errors');

	return (
		<VStack as={'section'} justify={'center'} align={'center'} className={classNames(cls.notFound, {}, [className])}>
			<Container fluid>
				<Text title={t('page not found')} align={TextAlign.CENTER} />
			</Container>
		</VStack>
	);
};

export default NotFoundPage;