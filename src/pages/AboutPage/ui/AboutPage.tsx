import { useTranslation } from 'react-i18next';
import { Section } from '@shared/ui/Section';
import { Container } from '@shared/ui/Container';
import cls from './AboutPage.module.scss';

const AboutPage = () => {
	const { t } = useTranslation('about');

	return (
		<Section className={cls.about}>
			<Container fluid>
				{t('title')}
			</Container>
		</Section>
	);
};

export default AboutPage;
