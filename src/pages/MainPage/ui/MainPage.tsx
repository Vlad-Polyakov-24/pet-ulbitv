import { useTranslation } from 'react-i18next';
import { Section } from '@widgets/Section';
import { Container } from '@shared/ui/Container';
import cls from './MainPage.module.scss';

const MainPage = () => {
	const { t } = useTranslation('main');

	return (
		<Section className={cls.main}>
			<Container fluid>
				{t('title')}
			</Container>
		</Section>
	);
};

export default MainPage;
