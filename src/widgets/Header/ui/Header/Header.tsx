import { useSelector } from 'react-redux';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { HeaderContent } from '../HeaderContent/HeaderContent';
import { getAuthData } from '@entities/User';
import cls from './Header.module.scss';

interface HeaderProps {
	className?: string;
}

const Header = ({ className }: HeaderProps) => {
	const authData = useSelector(getAuthData);

	return (
		<header className={classNames(cls.header, {}, [className])}>
			<Container className={cls.header__container}>
				<HeaderContent isAuth={!!authData} />
			</Container>
		</header>
	);
};

export default Header;