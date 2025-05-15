import { useParams } from 'react-router';
import { classNames } from '@shared/lib/classNames';
import { Section } from '@widgets/Section';
import { Container } from '@shared/ui/Container';
import cls from './ArticleEditPage.module.scss';

type ArticleEditPageProps = {
	className?: string;
};

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
	const { id } = useParams<{ id: string }>();
	const isEdit = Boolean(id);

	return (
		<Section className={classNames(cls.edit, {}, [className])}>
			<Container fluid>
				<p>article {isEdit ? 'edit' : 'create'} page</p>
			</Container>
		</Section>
	);
};

export default ArticleEditPage;