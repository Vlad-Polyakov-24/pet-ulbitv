import { useCallback, useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { Portal } from '@shared/ui/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const ANIMATION_DELAY = 300;

const Modal = (props: ModalProps) => {
	const {
		className,
		children,
		isOpen,
		onClose,
	} = props;

	const [isClosing, setIsClosing] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeHandler();
		}
	}, [closeHandler]);

	const onContentClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	};

	return (
		<Portal>
			<div className={classNames(cls.modal, mods, [className])}>
				<div className={cls.modal__overlay} onClick={closeHandler}>
					<div className={cls.modal__content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
