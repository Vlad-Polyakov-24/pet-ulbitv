import { useTranslation } from 'react-i18next';
import { classNames } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { LoginModal } from '@features/AuthByUsername';
import { Container } from '@shared/ui/Container';
import { Button, ButtonTheme } from '@shared/ui/Button';
import cls from './Header.module.scss';

interface HeaderProps {
	className?: string;
}

const Header = ({ className }: HeaderProps) => {
	const { t } = useTranslation();
	const { isOpen, open, close } = useToggle();

	return (
		<>
			<header className={classNames(cls.header, {}, [className])}>
				<Container className={cls.header__container}>
					<Button theme={ButtonTheme.CLEAR_INVERTED} className={'ml-a'} onClick={open}>
						{t('login')}
					</Button>
				</Container>
			</header>
			<LoginModal isOpen={isOpen} onClose={close} />
		</>
	);
};

export default Header;