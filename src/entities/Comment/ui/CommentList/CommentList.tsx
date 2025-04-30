import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { Text } from '@shared/ui/Text';
import CommentItem from '../CommentItem/CommentItem';
import type { IComment } from '../../model/types/Comment.types';
import cls from './CommentList.module.scss';

type CommentListProps = {
	className?: string;
	comments?: IComment[];
	isLoading?: boolean;
};

const CommentList = memo((props: CommentListProps) => {
	const { className, comments, isLoading } = props;
	const { t } = useTranslation('comments');

	return (
		<div className={classNames(cls.comments, {}, [className])}>
			{comments && comments?.length > 0 ? (
				<ul className={cls.comments__list}>
					{comments?.map((c) => <CommentItem key={c.id} isLoading={isLoading} comment={c} />)}
				</ul>
			) : (
				<Text title={t('comments not found')} />
			)}
		</div>
	);
});

export default CommentList;