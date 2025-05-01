import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Avatar } from '@shared/ui/Avatar';
import { Text } from '@shared/ui/Text';
import { Skeleton } from '@shared/ui/Skeleton';
import { AppLink } from '@shared/ui/AppLink';
import { RoutePath } from '@app/providers/AppRouter';
import type { IComment } from '../../model/types/Comment.types';
import cls from './CommentItem.module.scss';

type CommentItemProps = {
	className?: string;
	comment: IComment;
	isLoading?: boolean;
};

const CommentItem = memo((props: CommentItemProps) => {
	const { className, comment: { user: { username, avatar, id }, text }, isLoading } = props;

	const content = isLoading ? (
		<>
			<div className={cls.comment__header}>
				<Skeleton styles={{ width: 30, height: 30, borderRadius: '50%' }} />
				<Skeleton styles={{ width: 100, height: 16 }} />
			</div>
			<Skeleton styles={{ width: '100%', height: 24 }} />
		</>
	) : (
		<>
			<AppLink to={`${RoutePath.profile}${id}`}>
				<Avatar src={avatar} alt={username} size={30} />
				<Text title={username} />
			</AppLink>
			<Text text={text} />
		</>
	);

	return (
		<div className={classNames(cls.comment, {}, [className])}>
			{content}
		</div>
	);
});

export default CommentItem;