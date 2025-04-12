import { classNames } from '@shared/lib/classNames';
import { Modal } from '@shared/ui/Modal';
import LoginForm from '../LoginForm/LoginForm';
import cls from './LoginModal.module.scss';

type LoginModalProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
};

const LoginModal = (props: LoginModalProps) => {
	const { className, isOpen, onClose } = props;

	return (
		<Modal className={classNames(cls.modal, {}, [className])} isOpen={isOpen} onClose={onClose}>
			<LoginForm />
		</Modal>
	);
};

export default LoginModal;