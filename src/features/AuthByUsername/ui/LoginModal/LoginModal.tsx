import { Suspense } from 'react';
import { Modal } from '@shared/ui/Modal';
import { Loader } from '@shared/ui/Loader';
import { LoginForm } from '../LoginForm/LoginForm.async';

type LoginModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<Suspense fallback={<Loader />}>
			<LoginForm closeModal={onClose} />
		</Suspense>
	</Modal>
);

export default LoginModal;