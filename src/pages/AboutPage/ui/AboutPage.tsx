import { useTranslation } from 'react-i18next';
import { Container } from '@shared/ui/Container';
import cls from './AboutPage.module.scss';

const AboutPage = () => {
	const { t } = useTranslation('about');

	return (
		<section className={cls.about}>
			<Container fluid>
				{t('about us')}
			</Container>
		</section>
	);
};

export default AboutPage;
