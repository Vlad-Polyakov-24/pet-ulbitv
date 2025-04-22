import { memo, useCallback } from 'react';
import { Select } from '@shared/ui/Select';
import { currencySelectOptions } from '../../model/data/currencySelect.data';
import { Currency } from '../../model/types/Currency.types';

type CurrencySelectProps = {
	className?: string;
	label?: string;
	value?: Currency;
	onChange?: (value: Currency) => void;
	disabled?: boolean;
};

const CurrencySelect = memo((props: CurrencySelectProps) => {
	const { className, label, value, onChange, disabled } = props;

	const handleChange = useCallback(
		(value: string) => {
			onChange?.(value as Currency);
		},
		[onChange],
	);

	return (
		<Select
			className={className}
			options={currencySelectOptions}
			label={label}
			value={value}
			onChange={handleChange}
			disabled={disabled}
		/>
	);
});

export default CurrencySelect;