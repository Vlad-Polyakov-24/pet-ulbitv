import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { getCanEditArticle } from '../../model/selectors/article';
import { RoutePath } from '@app/providers/AppRouter';
import cls from './ArticlePageHeader.module.scss';

type ArticlePageHeaderProps = {
	className?: string;
	id: string;
};

const ArticlePageHeader = memo(({ className, id }: ArticlePageHeaderProps) => {
	const { t: tDefault } = useTranslation();
	const { t: tArticle } = useTranslation('article');
	const canEdit = useSelector(getCanEditArticle);

	return (
		<div className={classNames(cls.header, {}, [className])}>
			<Button as={Link} to={RoutePath.articles} theme={ButtonTheme.OUTLINE}>
				{tArticle('back to list')}
			</Button>
			{canEdit && (
				<Button as={Link} to={`${RoutePath.articles}/${id}/edit`} theme={ButtonTheme.OUTLINE}>
					{tDefault('edit')}
				</Button>
			)}
		</div>
	);
});

export { ArticlePageHeader };