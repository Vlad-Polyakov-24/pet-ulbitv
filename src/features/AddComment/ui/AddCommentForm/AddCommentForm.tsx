import { memo, useCallback, type FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { DynamicModuleLoader, type ReducersList } from '@shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { HStack } from '@shared/ui/Stack';
import { getAddCommentData } from '../../model/selectors/addCommentSelectors';
import { addCommentActions, addCommentReducer } from '../../model/slices/addCommentSlice';
import cls from './AddCommentForm.module.scss';

type AddCommentFormProps = {
	className?: string;
	handleSendComment: (comment: string) => void;
};

const reducers: ReducersList = {
	addComment: addCommentReducer,
};

const AddCommentForm = memo(({ className, handleSendComment }: AddCommentFormProps) => {
	const { t: tDefault } = useTranslation();
	const { t: tComments } = useTranslation('comments');
	const dispatch = useAppDispatch();
	const comment = useSelector(getAddCommentData);

	const handleChangeComment = useCallback((comment: string) => {
		dispatch(addCommentActions.setComment(comment))
	}, [dispatch]);

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSendComment(comment || '');
		handleChangeComment('');
	}, [comment, handleChangeComment, handleSendComment]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<HStack
				as={'form'}
				align={'center'}
				justify={'between'}
				gap={'10'}
				className={classNames(cls.form, {}, [className])}
				onSubmit={handleSubmit}
			>
				<Input
					placeholder={tComments('enter comment text')}
					value={comment}
					onChange={handleChangeComment}
				/>
				<Button type={'submit'}>
					{tDefault('send')}
				</Button>
			</HStack>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;