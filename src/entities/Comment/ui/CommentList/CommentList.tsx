import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui/Text';
import { VStack } from '@shared/ui/Stack';
import CommentItem from '../CommentItem/CommentItem';
import type { IComment } from '../../model/types/Comment.types';

type CommentListProps = {
	className?: string;
	comments?: IComment[];
	isLoading?: boolean;
};

const CommentList = memo((props: CommentListProps) => {
	const { className, comments, isLoading } = props;
	const { t } = useTranslation('comments');

	return (
		<div className={className}>
			{comments && comments?.length > 0 ? (
				<VStack as={'ul'} gap={'6'}>
					{comments?.map((c) => <CommentItem key={c.id} isLoading={isLoading} comment={c} />)}
				</VStack>
			) : (
				<Text title={t('comments not found')} />
			)}
		</div>
	);
});

export default CommentList;