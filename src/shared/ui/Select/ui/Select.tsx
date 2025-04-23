import { memo, useMemo, type ChangeEvent, type SelectHTMLAttributes } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import type { ISelectOptions } from '../model/types/Select.types';
import cls from './Select.module.scss';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
	className?: string;
	label?: string;
	onChange?: (value: string) => void;
	options: ISelectOptions[];
	error?: string;
}

const Select = memo((props: SelectProps) => {
	const { className, label, onChange, options, error, ...rest } = props;
	const mods: Mods = {
		[cls.error]: error,
	};

	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value);
	};

	const optionsList = useMemo(() => options.map(({ value, label }) => (
		<option key={value} className={cls.field__option} value={value}>{label}</option>
	)), [options]);

	return (
		<label className={classNames(cls.field, mods, [className])}>
			{label && <span className={cls.field__label}>{label}</span>}
			<select
				className={cls.field__select}
				onChange={handleOnChange}
				{...rest}
			>
				{...optionsList}
			</select>
			{error && <ErrorMessage message={error} />}
		</label>
	);
});

export default Select;