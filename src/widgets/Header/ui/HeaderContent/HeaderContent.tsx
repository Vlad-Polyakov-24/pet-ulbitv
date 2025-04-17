import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@app/providers/StoreProvider';
import { useToggle } from '@shared/hooks/useToggle';
import { LoginModal } from '@features/AuthByUsername';
import { Button, ButtonTheme } from '@shared/ui/Button';
import { userActions } from '@entities/User';

type HeaderContentProps = {
	isAuth?: boolean;
};

const HeaderContent = ({ isAuth = false }: HeaderContentProps) => {
	const { t } = useTranslation('auth');
	const { isOpen, open, close } = useToggle();
	const dispatch = useAppDispatch();

	const handleLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	if (isAuth) {
		return (
			<>
				<Button theme={ButtonTheme.CLEAR_INVERTED} className={'ml-a'} onClick={handleLogout}>
					{t('logout')}
				</Button>
			</>
		);
	}

	return (
		<>
			<Button theme={ButtonTheme.CLEAR_INVERTED} className={'ml-a'} onClick={open}>
				{t('login')}
			</Button>
			<LoginModal isOpen={isOpen} onClose={close} />
		</>
	);
};

export { HeaderContent };