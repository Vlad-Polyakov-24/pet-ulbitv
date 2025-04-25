import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { Text, TextAlign } from '@shared/ui/Text';
import { Article } from '@entities/Article';
import cls from './ArticlePage.module.scss';

type ArticlePageProps = {
	className?: string;
};

const ArticlePage = ({ className }: ArticlePageProps) => {
	// const { t: tArticle } = useTranslation('article');
	const { t: tErrors } = useTranslation('errors');
	const { id } = useParams<{ id: string }>();

	return (
		<section className={classNames(cls.article, {}, [className])}>
			<Container fluid>
				{id ? (
					<Article id={id} />
				) : (
					<Text align={TextAlign.CENTER} text={tErrors('article not found')} />
				)}
			</Container>
		</section>
	);
};

export default ArticlePage;