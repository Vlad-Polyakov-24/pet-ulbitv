import { memo, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { classNames } from '@shared/lib/classNames';
import cls from './Input.module.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	className?: string;
	label?: string;
	onChange?: (value: string) => void;
}

const Input = memo((props: InputProps) => {
	const { className, label, onChange, type = 'text', ...rest } = props;

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<label className={classNames(cls.field, {}, [className])}>
			{label && <span className={cls.field__label}>{label}</span>}
			<input
				className={cls.field__input}
				type={type}
				onChange={handleOnChange}
				{...rest}
			/>
		</label>
	);
});

export default Input;