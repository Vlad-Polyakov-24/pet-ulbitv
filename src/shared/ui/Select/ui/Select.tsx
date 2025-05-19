import { useMemo, type ChangeEvent, type SelectHTMLAttributes } from 'react';
import { Field, Label, Select as HSelect } from '@headlessui/react'
import { classNames, type Mods } from '@shared/lib/classNames';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import type { ISelectOptions } from '../model/types/Select.types';
import cls from './Select.module.scss';

interface SelectProps<T extends string> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
	className?: string;
	label?: string;
	onChange?: (value: T) => void;
	options: ISelectOptions<T>[];
	error?: string;
	orientation?: 'horizontal' | 'vertical';
}

const Select = <T extends string>(props: SelectProps<T>) => {
	const { className, label, onChange, options, error, orientation = 'vertical', ...rest } = props;
	const mods: Mods = {
		[cls.error]: error,
	};

	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value as T);
	};

	const optionsList = useMemo(() => options.map(({ value, label }) => (
		<option key={value} className={cls.field__option} value={value}>{label}</option>
	)), [options]);

	return (
		<Field className={classNames(cls.field, mods, [className, cls[orientation]])}>
			{label && <Label className={cls.field__label}>{label}</Label>}
			<HSelect
				className={cls.field__select}
				onChange={handleOnChange}
				{...rest}
			>
				{...optionsList}
			</HSelect>
			{error && <ErrorMessage className={cls.field__error} message={error} />}
		</Field>
	);
};

export default Select;