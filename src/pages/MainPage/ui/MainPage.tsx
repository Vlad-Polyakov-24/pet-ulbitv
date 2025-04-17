import { useTranslation } from 'react-i18next';
import { Container } from '@shared/ui/Container';
import cls from './MainPage.module.scss';

const MainPage = () => {
	const { t } = useTranslation('main');

	return (
		<section className={cls.main}>
			<Container fluid>
				{t('title')}
			</Container>
		</section>
	);
};

export default MainPage;
