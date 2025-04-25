import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import cls from './ArticlesPage.module.scss';

type ArticlesPageProps = {
	className?: string;
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const { t } = useTranslation('articles');

	return (
		<section className={classNames(cls.articles, {}, [className])}>
			<Container>
				{t('title')}
			</Container>
		</section>
	);
};

export default ArticlesPage;