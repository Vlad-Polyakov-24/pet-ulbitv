import { classNames } from '@shared/lib/classNames';
import { Modal } from '@shared/ui/Modal';
import LoginForm from '../LoginForm/LoginForm';

type LoginModalProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
};

const LoginModal = (props: LoginModalProps) => {
	const { className, isOpen, onClose } = props;

	return (
		<Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onClose}>
			<LoginForm closeModal={onClose} />
		</Modal>
	);
};

export default LoginModal;