import { memo, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import cls from './Input.module.scss';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	className?: string;
	label?: string;
	onChange?: (value: string) => void;
	error?: string;
}

const Input = memo((props: InputProps) => {
	const { className, label, onChange, type = 'text', error, ...rest } = props;
	const mods: Mods = {
		[cls.error]: error,
	};

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<label className={classNames(cls.field, mods, [className])}>
			{label && <span className={cls.field__label}>{label}</span>}
			<input
				className={cls.field__input}
				type={type}
				onChange={handleOnChange}
				{...rest}
			/>
			{error && <ErrorMessage message={error} />}
		</label>
	);
});

export default Input;