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
	error?: string;
};

const CurrencySelect = memo((props: CurrencySelectProps) => {
	const { onChange, ...rest } = props;

	const handleChange = useCallback(
		(value: string) => {
			onChange?.(value as Currency);
		},
		[onChange],
	);

	return (
		<Select
			options={currencySelectOptions}
			onChange={handleChange}
			{...rest}
		/>
	);
});

export default CurrencySelect;